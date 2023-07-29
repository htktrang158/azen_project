import { Button, Form, Modal, Space, Table, Input, Switch, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserAsync, UpdateUserAsync, getActiveAsync, getAllRoleAsync, getAllUserAsync, selectUsers } from "./registerSlice";
import "./styles.css";

const Register = () => {
    const dispatch = useDispatch();
    const [pages, setPages] = useState({ pageIndex: 1, PageSize: 10 });
    const [form] = Form.useForm();
    const [formRole] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const UsersState = useSelector(selectUsers);
    const { users } = UsersState;
    const [FieldsValue, setFieldsValue] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Tên đầy đủ",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Tên tài khoản",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Địa Chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Quyền",
            dataIndex: "roleName",
            key: "roleName",
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <Space style={{ display: "flex" }}>
                    <Switch
                        valuePropName="checked"
                        onClick={() => handleStatusAccount(record)}
                    />
                    <Button style={{ background: "orange", color: "white" }}
                        onClick={() => handleEditRole(record.roleName)}>Sửa Quyền</Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        dispatch(getAllUserAsync(pages));
        dispatch(getAllRoleAsync());
        dispatch(getActiveAsync())
    }, [pages]);
    const handleChangePage = (pages) => {
        const params = {
            pageIndex: pages.current,
            pageSize: pages.pageSize,
        };
        setPages(params);
        dispatch(getAllUserAsync(params))
    };
    const handleEditRole = (roleName) => {
        setIsDetailModalOpen(true);
        formRole.resetFields();
        formRole.setFieldsValue(roleName);
    };
    const handleStatusAccount = async (record) => {
        const data = { id: record.id, isActive: !record.isActive };
        await dispatch(getAllRoleAsync(data));
        dispatch(getAllUserAsync(pages));
    };
    const CreateRegister = () => {
        form.resetFields();
        setIsModalOpen(true);
        setCreateForm(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (values) => {
        console.log(values)
        setSearchRecord(UsersState?.driver?.items.filter(item => item.values == values))
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onFinish = async (values) => {
        console.log(values)
        if (values.id) {
            const res = await dispatch(UpdateUserAsync(values))
            console.log(values)
            if (res) {
                dispatch(getAllUserAsync());
            }
        }
        else {
            const res = await dispatch(CreateUserAsync(values))
            if (res) {
                dispatch(getAllUserAsync());
            }
        };
        setIsModalOpen(false);
    };
    return <div className="customer-container">
        <Button style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px", backgroundColor: "orange", color: "white" }}
            onClick={CreateRegister}>Tạo mới tài khoản</Button>
        <Modal
            title={"Tạo Người dùng"}
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
            >
                <Form.Item
                    label="Tên"
                    name="name"
                    placeholder="Nhập tên"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập Tên nhân viên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên đầy đủ"
                    name="fullName"
                    placeholder="Nhập tên đầy đủ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng Nhập Tên đầy đủ nhân viên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng Nhập Số điện thoại nhân viên!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    placeholder="Nhập địa chỉ"
                    rules={[
                        {
                            required: true,
                            message: ' Vui lòng nhập địa chỉ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Tên đăng nhập" name="username" rules={[
                    {
                        required: true,
                        message: 'tên đăng nhập k được để trống',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Mời nhập mật khẩu',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="ComfirmPassword"
                    name="ComfirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Mời nhập lại mật khẩu',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Quyền" name="description" > <Select>
                    {users?.result?.items.map((item, index) => (
                        <Select.Option key={index} value={item.roleName} rules={[
                            {
                                required: true,
                                message: 'Vui lòng Chọn quyền',
                            }
                        ]}>
                            {item.roleName}
                        </Select.Option>
                    ))}
                </Select>
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
        <Modal
            title="Sửa quyền"
            open={isDetailModalOpen}
            onCancel={() => setIsDetailModalOpen(false)}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Đóng
                </Button>,
                <Button key="ok" htmlType="submit" type="primary" form="form">
                    Gửi
                </Button>
            ]}
        >
            <Form.Item label="Quyền" name="description" rules={[
                {
                    required: true,
                    message: 'Vui lòng Chọn quyền',
                }
            ]}> <Select>
                    {users?.result?.items.map((item, index) => (
                        <Select.Option key={index} value={item.roleName}>
                            {item.roleName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Modal>
        <Table
            className="tableHome"
            dataSource={users?.result?.items}
            loading={UsersState?.isLoading}
            columns={columns}
            pagination={{
                size: "small",
                pageSize: 10,
                total: users?.result?.total,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            onChange={(page) => handleChangePage(page)}
        />    </div>
}
export default Register;