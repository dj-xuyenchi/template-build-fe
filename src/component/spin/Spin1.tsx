import "./spin1.css";

const Spin1 = () => {
  return (
    <div
      style={{
        fontSize: "12px",
      }}
    >
      <div className="loader-spin1"></div>
      <div className="loader-spin1-text">
        Đang tải dữ liệu<span className="dots"></span>
      </div>
    </div>
  );
};

export default Spin1;
