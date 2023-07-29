import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Table, Space, Form, Input, Row, Col, Button, Checkbox, DatePicker, Modal, Popconfirm } from "antd";
import "./styles.css";
import { CreateCustomerAsync, DeleteCustomerAsync, UpdateCustomerAsync, getAllCustomerAsync, selectCustomer } from "./customerSlice";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { CreateCustomersService } from "../../services/customerService";
const Customers = () => {
    const dispatch = useDispatch();
    const allCustomer = useSelector(selectCustomer);
    const { customer } = allCustomer;
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [createForm, setCreateForm] = useState(false);
    const [formclear] = Form.useForm();
    const [selectedRange, setSelectedRange] = useState([null, null]);
    const [modalText, setModalText] = useState("Bạn có muốn chuyển hướng qua màn hình Export Report để tải file không?");
    const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { RangePicker } = DatePicker;
    //---------------------------------------------------TABS DANH SÁCH BẢN KÊ ĐÃ TẠO-----------------------------------------
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Chi tiết khách hàng",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Hoạt động",
            key: "address",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => editcustomer(record.id)}><EditTwoTone /></Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => OndeleteCustomer(record.id)}>
                        <Button>
                            <DeleteOutlined style={{ color: "red" }} />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        dispatch(getAllCustomerAsync(pages));
    }, [pages]);
    const OndeleteCustomer = async (id) => {
        await dispatch(DeleteCustomerAsync(id))
        dispatch(getAllCustomerAsync(id))
    };
    const Onclear = () => {
        formclear.resetFields()
    };
    const handleChangePage = (pages) => {
        const params = {
            pageIndex: pages.current,
            pageSize: pages.pageSize,
        };
        setPages(params);
    };
    const showModalExport = () => {
        setOpen(true);
    };
    const Createcustomer = () => {
        form.resetFields();
        setIsModalOpen(true);
        setCreateForm(true);
    };
    const handleSearch = async (values) => {
        const dataSearch = {
            ...values,
        };
        await dispatch(getAllCustomerAsync(dataSearch));
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
    const editcustomer = (record) => {
        form.setFieldsValue({
            ...record
        });
        setIsModalOpen(true);

    };
    //-------------------Onclick Values Form CREATE-----------
    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (values) => {
        setSearchRecord(allCustomer?.customer?.items.filter(item => item.values == values))
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {
        if (values.id) {
            const res = await dispatch(UpdateCustomerAsync(values))
            if (res) {
                dispatch(getAllCustomerAsync());
            }
        }
        else {
            const res = await dispatch(UpdateCustomerAsync(values))
            if (res) {
                dispatch(getAllCustomerAsync());
            }
        };
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return <>
        <div className="customer-container">
            <div className="p-header">
                <div className="customer-nav">
                    <Form form={formclear} onFinish={handleSearch} name="formclear">
                        <Row gutter={12}>
                            <Col span={6}>
                                <Form.Item label="Số điện thoại" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="phone">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tên" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="name">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item label="Từ ngày - đến ngày" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="Date">
                                    <RangePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Modal
                            title={createForm ? "Thêm mới Khách Hàng" : "Sửa thông tin"}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="cancel">
                                    Cancel
                                </Button>,
                                <Button key="ok" htmlType="submit" type="primary" form="form" >
                                    Submit
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
                            >
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    label="Tên khách hàng"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập Tên khách hàng!',
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
                                            message: 'Vui lòng Nhập Số điện thoại khách hàng!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng Nhập email của khách hàng!'
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
                                            message: 'Vui lòng Nhập Địa chỉ khách hàng!',
                                        },
                                    ]}
                                >
                                    <Input />

                                </Form.Item>
                                <Form.Item label="Chi tiết khách hàng" name="description">
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
                    </Form>
                </div>
                <div className="choose">
                    <Space className="timkiem">
                        <Button onClick={Onclear}>Clear</Button>
                        <Button htmlType="submit" onClick={handleSearch}>Tìm kiếm</Button>
                        <Button onClick={showModalExport}>Export Excel</Button>
                        <Button onClick={Createcustomer}>Tạo mới khách hàng</Button>
                    </Space>
                </div>
                <Modal title="Title" open={open} onOk={handleOkExport} confirmLoading={confirmLoading} onCancel={handleCancelExport}>
                    <p>{modalText}</p>
                </Modal>
                {
                    <Table
                        dataSource={customer?.result?.items}
                        loading={allCustomer?.isLoading}
                        columns={columns}
                        pagination={{
                            size: "small",
                            pageSize: 10,
                            total: customer?.result?.total,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        onChange={(pages) => handleChangePage(pages)}
                    />
                }

            </div>
        </div>
    </>
}
export default Customers
