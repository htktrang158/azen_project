import { DeleteOutlined, EditOutlined, FundOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "./styles.css";
import { Table, Space, Form, Input, Row, Col, Button, Checkbox, DatePicker, Modal, Popconfirm, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CreateDriverAsync, DeleteDriverAsync, UpdateDriverAsync, getAllDriverAsync, selectDrivers } from "./driverSlice";

const Drivers = () => {
    const dispatch = useDispatch();
    const [pages, setPages] = useState({ pageIndex: 1, PageSize: 10 });
    const [form] = Form.useForm();
    const [formSearch] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const DriversrState = useSelector(selectDrivers);
    const { driver } = DriversrState;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const [searchRecord, setSearchRecord] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searhRaise, setSearchRaise] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { RangePicker } = DatePicker;
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Bạn có muốn chuyển hướng qua màn hình Export Report để tải file không?");
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "CMND/CCCD",
            dataIndex: "identity",
            key: "identity",
        },
        {
            title: "Địa Chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Bằng lái xe",
            dataIndex: "drivingLicense",
            key: "drivingLicense",
        },
        {
            title: "Biển Số Xe",
            dataIndex: "licensePlate",
            key: "licensePlate",
        },
        {
            title: "Công ty",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "SĐT công ty",
            dataIndex: "companyPhone",
            key: "companyPhone",
        },
        {
            title: "Chi tiết",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => editdriver(record)} >
                        <EditOutlined style={{ color: "yellow" }} />
                    </Button>
                    <Popconfirm title="Bạn có muốn xóa?" onConfirm={() => OndeleteDriver(record.id)} >
                        <Button >
                            <DeleteOutlined style={{ color: "red" }} />
                        </Button>
                    </Popconfirm>
                    <Button onClick={() => Onupimg(record.id)}>
                        <FundOutlined style={{ color: "green" }} />
                    </Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        dispatch(getAllDriverAsync(pages));
    }, [pages]);
    const handleChangePage = (pages) => {
        const params = {
            pageIndex: pages.current,
            pageSize: pages.pageSize,
        };
        setPages(params);
        console.log(pages)
    };
    const OndeleteDriver = async (id) => {
        await dispatch(DeleteDriverAsync(id))
        dispatch(getAllDriverAsync(id))
    };
    const showModalExport = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (values) => {
        console.log(values)
        setSearchRecord(DriversrState?.driver?.items.filter(item => item.values == values))
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOkExport = () => {
        setModalText("/");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancelExport = () => {
        setOpen(false);
    };
    const handleClear = () => {
        formSearch.resetFields();
    };
    const CreateDriver = () => {
        form.resetFields();
        setIsModalOpen(true);
        setCreateForm(true);
    };
    const handleSearch = async (values) => {
        const dataSearch = {
            ...values,
        };
        await dispatch(getAllDriverAsync(dataSearch));
    };
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    }
    const Onupimg = async (id) => {
        const res = await dispatch(getAllDriverAsync(id));
        setSelectedOrder(res.payload.result);
        setIsDetailModalOpen(true);
    };
    const editdriver = (record) => {
        form.setFieldsValue({
            ...record
        });
        setIsModalOpen(true);

    };
    const onFinish = async (values) => {
        if (values.id) {
            const res = await dispatch(CreateDriverAsync(values))
            if (res) {
                dispatch(getAllDriverAsync());
            }
        }
        else {
            const res = await dispatch(CreateDriverAsync(values))
            if (res) {
                dispatch(getAllDriverAsync());
            }
        };
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return <div className="customer-container">
        <Form form={formSearch} onFinish={handleSearch} name="formSearch">
            <div className="search">
                <Row gutter={12}>
                    <Col span={6}>
                        <Form.Item label="Biển Số Xe" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="licensePlate">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Tên" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="name">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Số điện thoại" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="phone">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="Từ ngày - đến ngày" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="Date">
                            <RangePicker />
                        </Form.Item>
                    </Col>
                </Row>
                {searhRaise && (
                    <Row gutter={12}>
                        <Col span={6}>
                            <Form.Item label="Tên Công Ty" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="SĐT Công Ty" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="phonecompany">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Bằng Lái Xe" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="cerfical">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="CMND/CCCD" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="CMND/CCCD">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
                <Modal
                    title="THÔNG TIN HÌNH ẢNH"
                    open={isDetailModalOpen}
                    onCancel={() => setIsDetailModalOpen(false)}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Đóng
                        </Button>,
                        <Button key="ok" htmlType="submit" type="primary" form="form">
                            Tải ảnh xuống
                        </Button>,
                        <Button key="ok" htmlType="submit" type="primary" form="form">
                            Gửi hình ảnh
                        </Button>,
                    ]}
                >
                    {selectedOrder && (
                        <>
                            <p>
                                <strong>Tên Tài xế:</strong> {selectedOrder.name}
                            </p>
                            <p>
                                <strong>Biển số xe:</strong> {selectedOrder.licensePlate}
                                <strong style={{ margin: "Left" }}>Biển số xe:</strong> {selectedOrder.licensePlate}
                            </p>
                            <p>
                                <strong>GPLX:</strong> {selectedOrder.saleStaff}
                            </p>
                            <p>
                                <strong>SĐT Công ty:</strong> {selectedOrder.phonecompany}
                            </p>
                            <input type="file" id="upload" hidden />
                            <label className="btncolor" for="upload"  >Tải hình ảnh</label>
                            <br />
                            <img alt="preview image" src={image} style={{ width: "200px", height: "200px" }} />
                            <input type="file" onChange={onImageChange} className="filetype" />
                            <img alt="preview image" src={image} />                       </>
                    )}
                </Modal>
                <Modal
                    title={createForm ? "Thêm mới Tài xế" : "Sửa thông tin"}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel">
                            Cancel
                        </Button>,
                        <Button key="ok" htmlType="submit" type="primary" form="form" >
                            Gửi
                        </Button>,
                    ]}>
                    <Form
                        labelCol={{
                            span: 40,
                        }}
                        wrapperCol={{
                            span: 30,
                        }}
                        style={{
                            maxWidth: 1000,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                        name="form"
                    > <Form.Item
                        label="id"
                        name="id"
                        style={{ display: "null" }}
                    >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="Tên Tài Xế"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập Tên tài xế!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng Nhập Số điện thoại tài xế!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng Nhập Địa chỉ tài xế!'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="CMND/CCCD"
                            name="identity"
                            rules={[
                                {
                                    required: true,
                                    message: ' Vui lòng Nhập CMND/CCCD của tài xế!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Bằng lái xe" name="drivingLicense" rules={[
                            {
                                required: true,
                                message: 'Vui lòng Nhập Bằng lái xe của tài xế!',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Biển số xe" name="licensePlate" rules={[
                            {
                                required: true,
                                message: 'Vui lòng Nhập Biển số xe!',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Thông tin chi tiết" name="description">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại Công ty" name="companyPhone">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                        </Form.Item>
                    </Form>
                </Modal >
                <div className="choose">
                    <Space className="timkiem">
                        <Button onClick={handleClear}>Clear</Button>
                        <Button htmlType="submit" onClick={handleSearch}>Tìm kiếm</Button>
                        <Button onClick={showModalExport}>Export Excel</Button>
                        <Button onClick={CreateDriver}>Tạo mới tài xế</Button>
                        <Checkbox onChange={() => setSearchRaise((searhRaise) => !searhRaise)} value={searhRaise}>
                            Tìm kiếm nâng cao
                        </Checkbox>
                    </Space>
                </div>
                <Modal title="Title" open={open} onOk={handleOkExport} confirmLoading={confirmLoading} onCancel={handleCancelExport}>
                    <p>{modalText}</p>
                </Modal>
                <Table
                    className="tableHome"
                    dataSource={driver?.result?.items}
                    loading={DriversrState?.isLoading}
                    columns={columns}
                    pagination={{
                        size: "small",
                        pageSize: 10,
                        total: driver?.result?.total,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    onChange={(page) => handleChangePage(page)}
                />
            </div>
        </Form>
    </div>
}
export default Drivers;