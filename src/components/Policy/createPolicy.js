import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Space,
  Table,
  Select,
  AutoComplete,
  DatePicker,
  Modal,
} from "antd";
import {
  GetDriverLicenceAsync,
  selecPolicy,
  getAllGetforblAsync,
  DriverAsync,
} from "./policySlice";
import { useState, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

function CreatePolicy() {
  const dispatch = useDispatch();
  // const [pages, setPages] = useState({ pageIndex: 1, PagesSize: 50 });
  const dateFormat = "DD/MM/YYYY";
  const { RangePicker } = DatePicker; //Ngay thang nam
  useEffect(() => {
    dispatch(GetDriverLicenceAsync());
  }, []);
  const AllLicence = useSelector(selecPolicy);
  const { driverLicence } = AllLicence;
  const fullDriverLicens = driverLicence?.result?.items;
  console.log("fullDriverLicens", fullDriverLicens);
  const options =
    fullDriverLicens &&
    fullDriverLicens.map((fullDriverLicen, index) => {
      return {
        label: fullDriverLicen.licensePlate,
        value: fullDriverLicen.id,
      };
    });
  console.log("otion", options);
  const [rowData, setRowData] = useState();

  const handleShowValueInput = async (value) => {
    const ex = await dispatch(DriverAsync(value));
    console.log("exxxxxx", ex);
    formCreate.setFieldsValue({
      ...ex?.payload?.result,
      company: ex?.payload?.result?.company,
      companyPhone: ex?.payload?.result?.companyPhone,
      name: ex?.payload?.result?.name,
      licensePlate: ex?.payload?.result?.licensePlate,
      address: ex?.payload?.result?.address,
      identity: ex?.payload?.result?.identity,
      licensePlate: ex?.payload?.result?.licensePlate,
      phone: ex?.payload?.result?.phone,
    });
  };
  console.log("rrrrr", rowData);

  const [formCreate] = Form.useForm(); //CLEAR FORM
  const ClearForm = () => {
    formCreate.resetFields();
  };

  const handleSelectDriver = (e) => {
    console.log(e);
  };
  // Show Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataForbl, setDataForBl] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handeListGoods = async () => {
    setIsModalOpen(true);
    const ex = await dispatch(getAllGetforblAsync());
    setDataForBl(ex);
  };
  const columnsforbl = [
    {
      title: "Mã Vận đơn",
      dataIndex: "code",
      key: "code",
      render: (text, record) => {
        return <span className="cl_code">{text}</span>;
      },
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Activity",
      key: "cccc",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-success"
            onClick={() => addProduct(record)}
          >
            Thêm
          </button>
        </Space>
      ),
    },
  ];

  //Add Product
  const [isModalOpenPr, setIsModalOpenPr] = useState(false);
  const [formPr] = Form.useForm();

  const showModalPr = () => {
    setIsModalOpenPr(true);
  };

  const handleOkPr = () => {
    setIsModalOpenPr(false);
    formPr.resetFields();
  };

  const handleCancelPr = () => {
    setIsModalOpenPr(false);
    formPr.resetFields();
  };
  const arr = [];
  const [itemPr, setItemPr] = useState([]);
  const addProduct = (values) => {
    setIsModalOpenPr(true);
    formPr.setFieldsValue({
      ...values.quantity,
      quantity: values.quantity,
    });
    setItemPr(values);
  };
  console.log("arrr", arr);

  //END SHOW MODAL
  const onFinish = (values) => {};
  const dataSource = [itemPr];

  const column = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "MVD",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "consignee",
      key: "consignee",
    },
    {
      title: "Tên Hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Lượng",
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
      title: "Hình thức thu tiền",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Số tiền lái xe thu",
      dataIndex: "0",
      key: "0",
    },
    {
      title: "Số tiền",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thao tác",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <div className="policy-table-create">
        <h1 className="policy-table-create-title">
          BẢNG KÊ GIAO NHẬN VẬN CHUYỂN
        </h1>

        <Form
          layout="vertical"
          className="policy-table-create-form"
          form={formCreate}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Mã bản kê" name="code" required>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item
                label="Ngày tháng"
                name="ngaythang"
                initialValue={dayjs()}
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Hợp đồng số" name="hopdong">
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Tên công ty" name="company">
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Số điện thoại" name="companyPhone">
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="MST" name="mst">
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Người lái xe" name="name" required>
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Biển số xe" name="licensePlate" required>
                <AutoComplete
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  options={options}
                  getInputElement={(options) => options.label}
                  onSelect={(value) => handleShowValueInput(value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Địa chỉ" name="address" required>
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="CMND" name="identity" required>
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Đã tạm ứng" name="datamung">
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Giấy phép lái xe" name="licensePlate" required>
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Điện thoại lái xe" name="phone" required>
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item label="Tổng cước cho xe" name="tongtien">
                <Input className="policy-table-create-inp" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className="policy-table-create-col"></Col>
            <Col span={8} className="policy-table-create-col"></Col>
            <Col span={8} className="policy-table-create-col">
              <Form.Item className="policy-table-create-col-btn">
                <Space wrap>
                  <Button
                    style={{ backgroundColor: "#ffbd2f" }}
                    type="primary"
                    onClick={handeListGoods}
                  >
                    Danh sách hàng cần đi
                  </Button>
                  <Button
                    onClick={ClearForm}
                    style={{ backgroundColor: "#ffbd2f" }}
                    type="primary"
                  >
                    Xoá dữ liệu để tạo mới
                  </Button>
                  <Button
                    style={{ backgroundColor: "#ffbd2f" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Gửi
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="policy-table-result">
        {<Table dataSource={dataSource} columns={column} pagination={false} />}
      </div>

      <Modal
        title="Danh Sách hàng Cần đi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Basic usage" />
        <Button>Tìm kiếm</Button>
        <Table
          dataSource={dataForbl?.payload?.result?.items}
          columns={columnsforbl}
        />
      </Modal>

      <Modal
        title="Chỉnh sửa đơn hàng đi"
        open={isModalOpenPr}
        onOk={handleOkPr}
        onCancel={handleCancelPr}
      >
        <Input placeholder="Basic usage" />;
        <Form form={formPr} layout="vertical" autoComplete="off">
          <Row>
            <Col span={12}>
              <Form.Item name="quantity" label="Số Lượng" required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="age" label="Tổng số thu">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default CreatePolicy;
