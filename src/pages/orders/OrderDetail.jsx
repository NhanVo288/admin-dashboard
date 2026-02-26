import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import Badge from "../../components/common/Badge.jsx";
import Rating from "../../components/common/Rating.jsx";
import Button from "../../components/common/Button.jsx";
import truck from "../../images/common/delivery-truck.gif";
import { useDispatch } from "react-redux";
import { 
  useUpdateOrderStatusMutation, 
  useGetOrderByIdQuery, 
  useGetOrderStatusHistoryQuery 
} from "../../store/order/order.api.js";

const OrderDetail = () => {
  const { orderID } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderID);
  const { data: history } = useGetOrderStatusHistoryQuery(orderID);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  console.log("OrderDetail render");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
    }
  }, [order]);

  const ORDER_STATUSES = [
    "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "FAILED"
  ];

  if (isLoading) return <div className="p-5">Loading order details...</div>;
  if (isError || !order) return <div className="p-5">Order not found!</div>;

  const handleInvoice = () => alert("Under Construction invoice page");

  const updateStatus = async () => {
    try {
      await updateOrderStatus({
        id: orderID,
        status: currentStatus,
      }).unwrap();
      setIsEditingStatus(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Hàm helper để map icon theo status
  const getStatusIcon = (status = "") => {
    const s = status.toLowerCase();
    if (s.includes("pending")) return <Icons.TbClock />;
    if (s.includes("confirmed")) return <Icons.TbChecklist />;
    if (s.includes("processing")) return <Icons.TbReload />;
    if (s.includes("shipped")) return <Icons.TbTruckDelivery />;
    if (s.includes("delivered")) return <Icons.TbShoppingBagCheck />;
    if (s.includes("cancelled")) return <Icons.TbX />;
    return <Icons.TbPoint />;
  };

  return (
    <section className="orders">
      <div className="container">
        <div className="wrapper">
          <div className="content">
            {/* TABLE ITEMS */}
            <div className="content_item">
              <h2 className="sub_heading">
                <span>Order #{order.orderNumber}</span>
                <Button
                  icon={<Icons.TbDownload />}
                  label="invoice"
                  className="bg_light_success sm"
                  onClick={handleInvoice}
                />
              </h2>
              <table className="bordered">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Item price</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {/* Placeholder nếu JSON không có ảnh */}
                          <div className="img_placeholder" style={{ width: '40px', height: '40px', background: '#eee' }}></div>
                          <Link to={`/catalog/product/manage/${item.productId}`}>
                            {item.productName}
                          </Link>
                        </div>
                      </td>
                      <td>{item.unitPrice?.toLocaleString()} đ</td>
                      <td>{item.quantity}</td>
                      <td><b>{item.subtotal?.toLocaleString()} đ</b></td>
                    </tr>
                  ))}
                  <tr className="footer_row">
                    <td colSpan="3" className="text-right"><b>Total amount</b></td>
                    <td><b className="text_primary">{order.totalAmount?.toLocaleString()} đ</b></td>
                  </tr>
                </tbody>
              </table>
              {order.notes && (
                <div className="order_notes mt-3">
                  <p><b>Notes:</b> {order.notes}</p>
                </div>
              )}
            </div>

            {/* STATUS HISTORY */}
            <div className="content_item">
              <h2 className="sub_heading">
                <span>Order Status</span>
                <div className="flex gap-2">
                  {!isEditingStatus ? (
                    <Button
                      icon={<Icons.TbEdit />}
                      label="Change Status"
                      className="bg_light_primary sm"
                      onClick={() => setIsEditingStatus(true)}
                    />
                  ) : (
                    <div className="flex gap-1">
                      <select
                        className="status_select"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <Button icon={<Icons.TbCheck />} className="bg_light_success sm" onClick={updateStatus} />
                      <Button icon={<Icons.TbX />} className="bg_light_danger sm" onClick={() => setIsEditingStatus(false)} />
                    </div>
                  )}
                </div>
              </h2>

              <div className="order_status">
                {/* Hiển thị timeline từ API history hoặc status hiện tại */}
                {(history || [{ status: order.status, createdAt: order.updatedAt }]).map((step, index) => (
                  <div key={index} className="order_status_item active">
                    <div className="order_status_icon">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="order_status_content">
                      <h3>{step.status}</h3>
                      <p>{new Date(step.createdAt || step.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR INFO */}
          <div className="sidebar">
            <div className="sidebar_item">
              <div className="logistics_item">
                <img src={truck} alt="delivery" height="80px" />
                <p><b>Order Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><b>Payment:</b> {order.paymentMethod}</p>
              </div>
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">Shipping Details:</h2>
              <div className="detail_list">
                <div className="detail_list_item">
                  <Icons.TbUser />
                  <p>Customer ID: {order.userId}</p>
                </div>
                <div className="detail_list_item">
                  <Icons.TbMapPin />
                  <p>{order.shippingAddress}, {order.shippingCity}</p>
                </div>
                <div className="detail_list_item">
                  <Icons.TbMail />
                  <p>Postal Code: {order.shippingPostalCode}</p>
                </div>
              </div>
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">Summary:</h2>
              <div className="detail_list">
                <div className="detail_list_item justify-between">
                  <span>Subtotal:</span>
                  <b>{order.totalAmount?.toLocaleString()} đ</b>
                </div>
                <div className="detail_list_item justify-between">
                  <span>Shipping:</span>
                  <b className="text_success">Free</b>
                </div>
                <hr />
                <div className="detail_list_item justify-between">
                  <span>Total:</span>
                  <b className="text_primary" style={{ fontSize: '1.2rem' }}>
                    {order.totalAmount?.toLocaleString()} đ
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;