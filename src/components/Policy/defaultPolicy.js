import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllPolicyAsync,
  getDetailPolicyAsync,
  selecPolicy,
  ExportPDFAsync,
} from "./policySlice";
import download from "downloadjs";
import { getUserProfileService } from "../../services/authServices";

import {
  Table,
  Space,
  Spin,
  Tabs,
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  DatePicker,
  Modal,
} from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import "./style.css";
import dayjs from "dayjs";
import formatDate from "../../utils/functions";

function DefaultPolicy() {
  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch();
  const [pages, setPages] = useState({ pageIndex: 1, PagesSize: 10 }); //Pages
  const [handleRangePicker, setHandleRangePicker] = useState([null, null]);

  useEffect(() => {
    dispatch(getAllPolicyAsync(pages));
  }, [pages]);

  const allPolicy = useSelector(selecPolicy);

  const { policy } = allPolicy;
  console.log("allProci", allPolicy);
  const { RangePicker } = DatePicker; //Ngay thang nam
  const [searhRaise, setSearchRaise] = useState(false);
  const [formsearch] = Form.useForm(); //CLEAR FORM
  //Format DAte to Search
  const formatDateSearch = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  //Paniagetion Table
  const handleChangePagi = (pages) => {
    const params = {
      pageIndex: pages.current,
      pageSize: pages.pageSize,
    };

    setPages(params);
  };
  const ClearForm = () => {
    formsearch.resetFields();
  };
  //START SEARCH FORM
  const handleRangeChange = (dates) => {
    if (dates !== null) setSelectedRange(dates);
  };
  const FormSeach = async (values) => {
    const params = {
      ...values,
      LadingDateFrom: dayjs(values.createdDate[0]).format("YYYY-MM-DD"),
      LadingDateTo: dayjs(values.createdDate[1]).format("YYYY-MM-DD"),
    };
    delete params.createdDate;
    await dispatch(getAllPolicyAsync(params));
  };
  //END SEARCH FORM
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };

  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  //Start Update Hinh ảnh
  const [inforDetail, setInforDetail] = useState([]);
  const DetailInfo = async (id) => {
    setIsModalOpenDetail(true);

    const Po = await dispatch(getDetailPolicyAsync(id));
    setInforDetail(Po);
  };

  //END Update Hinh ảnh

  //START Open Modal BK-----//
  const [valueBK, setValueBk] = useState([]);
  const [isModalOpenBK, setIsModalOpenBK] = useState(false);
  const showModalBK = () => {
    setIsModalOpenBK(true);
  };

  const handleOkBK = async (id) => {
    setIsModalOpenBK(false);
  };
  const ExportPDF = async (value) => {
    const role = await getUserProfileService();
    const type = role?.data?.result?.role;

    const params = {
      id: value?.payload?.result?.id,
      type: type,
    };
    const ex = await dispatch(ExportPDFAsync(params));
    console.log(ex);
    const content = ex.payload.headers["content-type"];
    download(ex.payload.data, "Azen.pdf", content);
  };

  const handleCancelBK = () => {
    setIsModalOpenBK(false);
  };
  const handleModalBK = async (id) => {
    setIsModalOpenBK(true);
    const Poli = await dispatch(getDetailPolicyAsync(id));
    setValueBk(Poli);
    // console.log("ccccc", Poli.payload.result.deliveryOrderBillOfLadings);
  };
  const columnsBK = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Mã Vận Đơn",
      dataIndex: "code",
      key: "code",
      render: (text, record) => {
        return <span className="cl_code">{text}</span>;
      },
    },
    {
      title: "Tên hàng",
      dataIndex: "consignee",
      key: "consignee",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nơi Giao",
      dataIndex: "toAddress",
      key: "toAddress",
    },
    {
      title: "Số điện thoại",
      dataIndex: "consigneePhone",
      key: "consigneePhone",
    },
    {
      title: "Hinh thức thu tiền",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    ,
    {
      title: "Số tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
  ];
  //END Open Modal BK-----//

  const changeTabs = () => {};
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Số mã",
      dataIndex: "code",
      key: "code",
      render: (text, record) => {
        return (
          <span className="cl_code" onClick={() => handleModalBK(record.id)}>
            {text}
          </span>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: "Số điện thoại đối tác",
      dataIndex: "partnerPhone",
      key: "partnerPhone",
    },
    {
      title: "Tài xế",
      dataIndex: "Driver",
      key: "Driver",
    },
    {
      title: "Số điện thoại tài xế",
      dataIndex: "driverPhone",
      key: "driverPhone",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalFreight",
      key: "totalFreight",
    },
    {
      title: "Activity",
      key: "cccc",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-success"
            onClick={() => getDetailBook(record)}
          >
            Update
          </button>
          <button
            onClick={() => DetailInfo(record.id)}
            className="btn btn-danger"
          >
            Detail
          </button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="policy-nav">
        <Form layout="vertical" onFinish={FormSeach} form={formsearch}>
          <Row>
            <Col
              span={6}
              className="policy-table-create-col policy-table-create-col-first"
            >
              <Form.Item label="Mã bảng kê" name="code">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} className="policy-table-create-col">
              <Form.Item label="Biển số xe" name="licensePlate">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} className="policy-table-create-col">
              <Form.Item label="Số điện thoại tài xế" name="driverPhone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} className="policy-table-create-col">
              <Form.Item
                label="Từ ngày - đến ngày"
                name="createdDate"
                initialValue={[dayjs("01/01/2022", dateFormat), dayjs()]}
              >
                <RangePicker format={dateFormat} />
              </Form.Item>
            </Col>
          </Row>
          {searhRaise && (
            <>
              <Row>
                <Col
                  span={6}
                  className="policy-table-create-col policy-table-create-col-first"
                >
                  <Form.Item
                    label="Nhân viên kinh doanh"
                    name="nhanvienkinhdoanh"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} className="policy-table-create-col">
                  <Form.Item label="Tên đối tác" name="Partner">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} className="policy-table-create-col">
                  <Form.Item label="SDT đối tác" name="PartnerPhone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} className="policy-table-create-col">
                  <Form.Item label="Tổng tiền từ" name="TotalFreightFrom">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col
                  span={6}
                  className="policy-table-create-col policy-table-create-col-first"
                >
                  <Form.Item label="Tổng số tiền đến" name="TotalFreightTo">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col span={12}>
              <Space wrap>
                <Button
                  style={{ backgroundColor: "#ffbd2f" }}
                  type="primary"
                  //
                  onClick={ClearForm}
                >
                  Clear
                </Button>
                <Button
                  style={{ backgroundColor: "#ffbd2f" }}
                  htmlType="submit"
                  type="primary"
                >
                  Tìm kiếm
                </Button>
                <Button style={{ backgroundColor: "#ffbd2f" }} type="primary">
                  Export Excel
                </Button>
                <Button
                  style={{ backgroundColor: "#ffbd2f" }}
                  type="primary"
                  onClick={() => changeTabs()}
                >
                  Tạo bảng kê mới
                </Button>
                <Checkbox
                  onChange={() => setSearchRaise((searhRaise) => !searhRaise)}
                  value={searhRaise}
                >
                  Tìm kiếm nâng cao
                </Checkbox>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      {
        <Table
          dataSource={policy?.result?.items}
          columns={columns}
          loading={allPolicy.isLoading}
          pagination={{
            size: "small",
            total: policy?.result?.total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={(page) => handleChangePagi(page)}
        />
      }

      {/* //Modal Detail Poliy */}
      <Modal
        title="THÔNG TIN CHI TIẾT"
        open={isModalOpenDetail}
        onOk={handleOkDetail}
        onCancel={handleCancelDetail}
      >
        <div className="Pmodal-detail">
          <div className="Pmodal-detail-content">
            <div className="Pmodal-detail-content-left">
              <h3>
                Tên tài xế: <span>{inforDetail?.payload?.result?.driver}</span>
              </h3>
              <h3>
                SĐT đối tác:{" "}
                <span>{inforDetail?.payload?.result?.partnerPhone}</span>
              </h3>
            </div>
            <div className="Pmodal-detail-content-right">
              <h3>
                SDT: <span>{inforDetail?.payload?.result?.driverPhone}</span>
              </h3>
              <h3>
                Tổng tiền:{" "}
                <span>{inforDetail?.payload?.result?.totalFreight}</span>
              </h3>
            </div>
          </div>
          <input type="file" />
        </div>
      </Modal>

      {/* Modal Thông tin chi tiết */}

      <Modal
        title="BẢN KÊ GIAO NHẬN VẬN CHUYỂN----"
        open={isModalOpenBK}
        onOk={handleOkBK}
        onCancel={handleCancelBK}
        className="PModal-BK"
      >
        <Row>
          <Col span={8} className="PBK-Modal">
            <h3>
              Tên công ty: <span>{valueBK?.payload?.result?.partner}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              Điện thoại: <span>{valueBK?.payload?.result?.partnerPhone}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              mã số thuế: <span>{valueBK?.payload?.result?.driverPhone}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="PBK-Modal">
            <h3>
              Số hợp đông: <span>{valueBK?.payload?.result?.driverPhone}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              Người Lái xe: <span>{valueBK?.payload?.result?.driver}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              Biển số xe: <span>{valueBK?.payload?.result?.licensePlate}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="PBK-Modal">
            <h3>
              CMND:
              <span>{valueBK?.payload?.result?.driverIdentity}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              Điạ chỉ: <span>{valueBK?.payload?.result?.totalFreight}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="PBK-Modal">
            <h3>
              GPLX: <span>{valueBK?.payload?.result?.driverPhone}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              Điện thoại Lái xe:{" "}
              <span>{valueBK?.payload?.result?.driverPhone}</span>
            </h3>
          </Col>
          <Col span={8} className="PBK-Modal">
            <h3>
              Tổng Cước cho xe:{" "}
              <span>{valueBK?.payload?.result?.driverPhone}</span>
            </h3>
          </Col>
        </Row>
        {
          <Table
            dataSource={valueBK?.payload?.result?.deliveryOrderBillOfLadings}
            columns={columnsBK}
          />
        }
        <Button onClick={() => ExportPDF(valueBK)}>Dowwload</Button>
      </Modal>
    </>
  );
}

export default DefaultPolicy;
