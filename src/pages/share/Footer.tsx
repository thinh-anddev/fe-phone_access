import logo from "@/assets/image-common/logo.png";
const Footer = () => {
  return (
    <div className="bg-primary items-center h-[200px] grid grid-cols-3">
      <div className="col-span-1">
        <img src={logo} alt="logo" className="h-[100px] m-auto" />
      </div>
      <div className="flex flex-col col-span-1 gap-3">
        <div>Tuyển dụng</div>
        <div>Liên hệ</div>
        <div>Tuyển dụng</div>
      </div>
      <div className="flex flex-col col-span-1 gap-3">
        <div>Tuyển dụng</div>
        <div>Liên hệ</div>
        <div>Tuyển dụng</div>
      </div>
    </div>
  );
};
export default Footer;
