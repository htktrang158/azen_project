import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createDeliveryOrder,
    getAllDeliveryOrder,
    selectOrderDelivery,
    deleteDeliveryOrder,
    getDetailDeliveryOrder,
    getSaleStaff,
    getImageProduct,
    postImageProduct,
    getAccountDeliveryOrder,
} from "./orderSlice";
import {
    Button,
    Table,
    Input,
    Space,
    Dropdown,
    Select,
    Form,
    Checkbox,
    Radio,
    Modal,
    Tooltip,
    Card,
    InputNumber,
    Pagination,
    DatePicker,
    Popconfirm,
} from "antd";
import { Col, Divider, Row } from "antd";
import "./style.css";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "./style.css";
const { Option } = Select;
const { TextArea } = Input;
import { v4 as randomid } from "uuid";
import { selectKeyGen } from "./keySlice";
import formatDate from "../../utils/functions";
import Upload from "antd/es/upload/Upload";
import { wait } from "@testing-library/user-event/dist/utils";
import { downloadImageService } from "../../services/orderDeliveryService";

import { useTranslation } from "react-i18next";
const Home = () => {
    const { i18n, t } = useTranslation();
    const translate = (lang) => {
        i18n.changeLanguage(lang);
    };
    const dispatch = useDispatch();
    const [pages, setPages] = useState({ PageIndex: 1, PageSize: 10 });
    const [form] = Form.useForm();
    const [formSearch] = Form.useForm();
    const [formDetailDelivery] = Form.useForm();
    const deliveryOrderState = useSelector(selectOrderDelivery);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [value, setValue] = useState(true);
    const [createForm, setCreateForm] = useState(false);
    const [searchRecord, setSearchRecord] = useState([]);
    const [deliveryOrderDetails, setDeliveryOrderDetails] = useState([]);
    const [searhRaise, setSearchRaise] = useState(false);
    const { RangePicker } = DatePicker;
    const dateFormat = "DD/MM/YYYY";
    const [isModalOpenCode, setIsModalOpenCode] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");
    const [selectedRange, setSelectedRange] = useState([null, null]);
    const [chooseEdit, setChooseEdit] = useState({});
    const [imageUrls, setImageUrls] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(1);
    const [fileList, setFileList] = useState([]);
    const [valueOrder, setValueOrder] = useState([]);
    const [viewModel, setViewModel] = useState(true);

    const PROVINCE = [
        { code: "076", name: "An Giang" },
        { code: "064", name: "Bà Rịa - Vũng Tàu" },
        { code: "781", name: "Bạc Liêu" },
        { code: "281", name: "Bắc Kạn" },
        { code: "240", name: "Bắc Giang" },
        { code: "241", name: "Bắc Ninh" },
        { code: "075", name: "Bến Tre" },
        { code: "650", name: "Bình Dương" },
        { code: "056", name: "Bình Định" },
        { code: "651", name: "Bình Phước" },
        { code: "062", name: "Bình Thuận" },
        { code: "780", name: "Cà Mau" },
        { code: "712", name: "Cần Thơ (TP)" },
        { code: "026", name: "Cao Bằng" },
        { code: "511", name: "Đà Nẵng" },
        { code: "050", name: "Đắk Lắk" },
        { code: "502", name: "Đắk Nông" },
        { code: "090", name: "Điện Biên" },
        { code: "061", name: "Đồng Nai" },
        { code: "067", name: "Đồng Tháp" },
        { code: "059", name: "Gia Lai" },
        { code: "019", name: "Hà Giang" },
        { code: "351", name: "Hà Nam" },
        { code: "004", name: "Hà Nội" },
        { code: "039", name: "Hà Tĩnh" },
        { code: "320", name: "Hải Dương" },
        { code: "031", name: "Hải Phòng" },
        { code: "711", name: "Hậu Giang" },
        { code: "018", name: "Hòa Bình" },
        { code: "008", name: "Hồ Chí Minh" },
        { code: "321", name: "Hưng Yên" },
        { code: "058", name: "Khánh Hòa" },
        { code: "077", name: "Kiên Giang" },
        { code: "060", name: "Kon Tum" },
        { code: "023", name: "Lai Châu" },
        { code: "063", name: "Lâm Đồng" },
        { code: "025", name: "Lạng Sơn" },
        { code: "020", name: "Lào Cai" },
        { code: "072", name: "Long An" },
        { code: "350", name: "Nam Định" },
        { code: "038", name: "Nghệ An" },
        { code: "030", name: "Ninh Bình" },
        { code: "068", name: "Ninh Thuận" },
        { code: "210", name: "Phú Thọ" },
        { code: "057", name: "Phú Yên" },
        { code: "052", name: "Quảng Bình" },
        { code: "510", name: "Quảng Nam" },
        { code: "055", name: "Quảng Ngãi" },
        { code: "033", name: "Quảng Ninh" },
        { code: "053", name: "Quảng Trị" },
        { code: "079", name: "Sóc Trăng" },
        { code: "022", name: "Sơn  La" },
        { code: "066", name: "Tây Ninh" },
        { code: "036", name: "Thái Bình" },
        { code: "280", name: "Thái Nguyên" },
        { code: "037", name: "Thanh Hóa" },
        { code: "054", name: "Thừa Thiên Huế" },
        { code: "073", name: "Tiền Giang" },
        { code: "074", name: "Trà Vinh" },
        { code: "027", name: "Tuyên Quang" },
        { code: "070", name: "Vĩnh Long" },
        { code: "211", name: "	Vĩnh Phúc" },
        { code: "029", name: "Yên Bái" },
    ];
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, record, index) => currentOrder + index,
        },
        {
            title: "Ngày tạo",
            dataIndex: "codeDate",
            key: "codeDate",
            render: (dateString) => formatDate(dateString),
        },
        {
            title: "Số mã",
            dataIndex: "code",
            key: "code",
            render: (text, record) => {
                return (
                    <span className="cl_code" onClick={() => showModalCode(record.id)}>
                        {text}
                    </span>
                );
            },
        },
        {
            title: "NVKD",
            dataIndex: "saleStaff",
            key: "saleStaff",
        },
        {
            title: "Tên hàng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Điểm nhận hàng",
            dataIndex: "fromAddress",
            key: "fromAddress",
        },
        {
            title: "SDT người gửi",
            dataIndex: "shipperPhone",
            key: "shipperPhone",
            hidden: value,
        },
        {
            title: "Điểm giao hàng",
            dataIndex: "toAddress",
            key: "toAddress",
        },
        {
            title: "SDT người nhận",
            dataIndex: "consigneePhone",
            key: "consigneePhone",
            hidden: value,
        },
        {
            title: "Giá cước",
            dataIndex: "totalAmount",
            key: "totalAmount",
            hidden: value,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => (
                <Tooltip
                    title={
                        text === "New"
                            ? "Đơn mới"
                            : text === "Gone"
                                ? "Đơn hàng đã đi"
                                : text === "Inventory"
                                    ? "Đơn hàng tồn kho"
                                    : "Đơn hàng có phát sinh"
                    }
                >
                    <Button
                        className="cl_status"
                        style={{
                            backgroundColor: text === "New" ? "rgb(10, 124, 255)" : "rgb(255, 77, 79)",
                        }}
                    />
                </Tooltip>
            ),
        },
        {
            title: "HTTT",
            dataIndex: "paymentType",
            key: "paymentType",
        },
        {
            title: "Hoàn tất",
            dataIndex: "isDone",
            key: "isDone",
            render: (text) => (
                <Tooltip title={text ? "đã hoàn tất" : "Chưa hoàn tất"}>
                    <Button
                        className="cl_isDone"
                        style={{
                            backgroundColor: text ? "rgb(10, 124, 255)" : "rgb(255, 77, 79)",
                        }}
                    />
                </Tooltip>
            ),
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => editDeliveryOrder(record.id)}>
                        <EditOutlined style={{ color: "yellow" }} />
                    </Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <Button>
                            <DeleteOutlined style={{ color: "red" }} />
                        </Button>
                    </Popconfirm>
                    <Button onClick={() => detailsDeliveryOrder(record.id)}>
                        <InfoCircleOutlined style={{ color: "green" }} />
                    </Button>
                </Space>
            ),
        },
    ].filter((item) => !item.hidden);
    const columnsDetail = [
        {
            title: "Tên hàng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "ĐVT",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Khối lượng",
            dataIndex: "mass",
            key: "mass",
        },
        {
            title: "Trọng lượng",
            dataIndex: "weight",
            key: "weight",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => editDetailDeliveryOrder(record.id)}>
                        <EditOutlined style={{ color: "yellow" }} />
                    </Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteDetail(record.id)}>
                        <Button>
                            <DeleteOutlined style={{ color: "red" }} />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const fees = [
        {
            title: "Tên công ty",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Phí",
            dataIndex: "fee",
            key: "fee",
        },
    ];
    const ladings = [
        {
            title: "Mã bảng kê",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Tên lái xe",
            dataIndex: "driver",
            key: "driver",
        },
        {
            title: "Bằng lái xe",
            dataIndex: "driverIdentity",
            key: "driverIdentity",
        },
        {
            title: "Số điện thoại tài xế",
            dataIndex: "driverPhone",
            key: "driverPhone",
        },
        {
            title: "Biển số xe",
            dataIndex: "licensePlate",
            key: "licensePlate",
        },
        {
            title: "Đối tác",
            dataIndex: "partner",
            key: "partner",
        },
        {
            title: "SĐT Đối tác",
            dataIndex: "partnerPhone",
            key: "partnerPhone",
        },
    ];
    useEffect(() => {
        dispatch(getAllDeliveryOrder(pages));
        dispatch(getSaleStaff());
    }, [pages]);

    const formatDateSearch = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const detailsDeliveryOrder = async (id) => {
        const res = await dispatch(getDetailDeliveryOrder(id));
        const imageProduct = {
            Id: id,
            Type: "Product",
        };
        const resImage = await dispatch(getImageProduct(imageProduct));
        console.log(resImage);
        setImageUrls(resImage.payload);
        setSelectedOrder(res.payload.result);
        setIsDetailModalOpen(true);
    };
    const editDeliveryOrder = async (id) => {
        const res = await dispatch(getDetailDeliveryOrder(id));
        setDeliveryOrderDetails(res.payload.result.deliveryOrderDetails);
        form.resetFields();
        setCreateForm(false);
        setIsModalOpen(true);
        form.setFieldsValue({
            ...res.payload.result,
            orderDate: dayjs(formatDate(res.payload.result.orderDate), "DD/MM/YYYY"),
        });
    };
    const editDetailDeliveryOrder = (id) => {
        console.log(deliveryOrderDetails.filter((d) => d.id === id)[0]);
        setEditDetail(id);
        formDetailDelivery.resetFields();
        formDetailDelivery.setFieldsValue({
            ...deliveryOrderDetails.filter((d) => d.id === id)[0],
        });
    };
    const onFinish = async (values) => {
        if (values.id) {
            const data = {
                ...values,
                isGenCode: values.isGenCode,
                deliveryOrderDetails: [...deliveryOrderDetails],
                orderDate: formatDateSearch(values.orderDate),
            };
            await dispatch(createDeliveryOrder(data));
        } else {
            values.id = randomid();
            const data = {
                ...values,
                isGenCode: values.isGenCode,
                deliveryOrderDetails: [...deliveryOrderDetails],
                orderDate: formatDateSearch(values.orderDate),
            };
            console.log(data);
            await dispatch(createDeliveryOrder(data));
        }
        await dispatch(getAllDeliveryOrder());
        setIsModalOpen(false);
        setDeliveryOrderDetails([]);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const showModalExport = () => {
        setOpen(true);
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
    const handleUpload = (file) => {
        setFileList([file]);
    };
    const handleDelete = async (id) => {
        await dispatch(deleteDeliveryOrder(id));
        await dispatch(getAllDeliveryOrder());
    };
    const handleDeleteDetail = (id) => {
        setDeliveryOrderDetails(deliveryOrderDetails.filter((d) => d.id !== id));
    };
    const handleChangePage = (pages) => {
        const params = {
            pageIndex: pages.current,
            pageSize: pages.pageSize,
        };
        const newOrder = (pages.current - 1) * 10 + 1;
        setCurrentOrder(newOrder);
        setPages(params);
    };
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    const CreateOrder = () => {
        form.resetFields();
        setIsModalOpen(true);
        setCreateForm(true);
    };
    const showModalCode = async (id) => {
        setIsModalOpenCode(true);
        const res = await dispatch(getAccountDeliveryOrder(id));
        setValueOrder(res);
    };
    const handleOkCode = () => {
        setIsModalOpenCode(false);
        setViewModel(true);
    };
    const handleCancelCode = () => {
        setIsModalOpenCode(false);
        setViewModel(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDetailModalOpen(false);
        setDeliveryOrderDetails([]);
        setImageUrls([]);
        formDetailDelivery.resetFields();
    };
    const handleRangeChange = (dates) => {
        if (dates !== null) setSelectedRange(dates);
    };
    const handleSearch = async (values) => {
        console.log(values);
        const [startDate, endDate] = selectedRange;
        const dataSearch = {
            ...values,
            codeDateTo: startDate !== null ? formatDateSearch(startDate) : null,
            codeDateFrom: endDate !== null ? formatDateSearch(endDate) : null,
        };
        await dispatch(getAllDeliveryOrder(dataSearch));
        setSelectedRange([null, null]);
    };
    const handleClear = () => {
        formSearch.resetFields();
    };
    const formatCurrency = (value) => {
        if (!isNaN(value)) {
            const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${formattedValue} VNĐ`;
        }
        return "";
    };
    const parseCurrency = (value) => {
        return value
            .toString()
            .replace(/\s?VNĐ/g, "")
            .replace(/,/g, "");
    };
    const addItemProducts = () => {
        console.log(formDetailDelivery.getFieldsValue().name);
        if (formDetailDelivery.getFieldsValue().name !== undefined) {
            const newItem = { ...formDetailDelivery.getFieldsValue(), id: randomid() };
            setDeliveryOrderDetails([...deliveryOrderDetails, newItem])
        }
        formDetailDelivery.resetFields();
    };
    return (
        <div className="container">
            <Form form={formSearch} onFinish={handleSearch} name="formSearch">
                <div className="search">
                    <Row gutter={12}>
                        <Col span={6}>
                            <Form.Item label={t("Code")} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="code">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t("OrderStatus")} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="status">
                                <Select placeholder="Chọn Trạng thái đơn hàng">
                                    <Option value="New">Đơn mới</Option>
                                    <Option value="Gone">Đơn hàng đã đi</Option>
                                    <Option value="Inventory">Đơn hàng tồn kho</Option>
                                    <Option value="Incurred">Đơn hàng có phát sinh</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t("Payments")} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="paymentType">
                                <Select placeholder="Chọn hình thức thanh toán">
                                    <Option value="TTS">TTS</Option>
                                    <Option value="TDN">TĐN</Option>
                                    <Option value="DTT">ĐTT</Option>
                                    <Option value="Other">Khác</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={t("CompletedOrder")} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="isDone">
                                <Select placeholder="Chọn đơn hàng đã hoàn tất hay chưa">
                                    <Option value="true">Đơn hàng đã hoàn tất</Option>
                                    <Option value="false">Đơn hàng chưa hoàn tất</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    {searhRaise && (
                        <Row gutter={12}>
                            <Col span={6}>
                                <Form.Item label=" Nhân viên kinh doanh" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="saleStaff">
                                    <Select>
                                        {deliveryOrderState.saleStaff.result === undefined
                                            ? null
                                            : deliveryOrderState.saleStaff.result.map((staff) => (
                                                <Option key={staff.userName} value={staff.userName}>
                                                    {staff.fullName}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Từ ngày - Đến ngày" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                    <RangePicker
                                        defaultValue={[dayjs("01/01/2015", dateFormat), dayjs("06/07/2023", dateFormat)]}
                                        format={dateFormat}
                                        onChange={handleRangeChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Địa điểm nhận hàng" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="fromAddress">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Địa điểm giao hàng" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="toAddress">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tên khách hàng" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="consignee">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}

                    <div className="choose">
                        <Space className="timkiem">
                            <Button onClick={handleClear}>{t("Clear")}</Button>
                            <Button htmlType="submit">{t("Search")}</Button>
                            <Button onClick={showModalExport}>{t("ExportExcel")}</Button>
                            <Button onClick={CreateOrder}>{t("CreateNewOrder")}</Button>
                            <Checkbox onChange={() => setSearchRaise((searhRaise) => !searhRaise)} value={searhRaise}>
                                {t("AdvancedSearch")}
                            </Checkbox>
                        </Space>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={true}>{t("Compact")}</Radio>
                            <Radio value={false}>{t("EntireColumn")}</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </Form>

            <Modal
                className="modalRevision"
                title={createForm ? "Tạo mới đơn" : "Sửa đơn"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Đóng
                    </Button>,
                    <Button key="ok" htmlType="submit" type="primary" form="form">
                        Gửi
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Tạo mã vận tải"
                                name="isGenCode"
                                rules={[{ required: true, message: "Vui lòng lựa chọn!" }]}
                            >
                                <Radio.Group>
                                    <Radio value={true}>Tạo</Radio>
                                    <Radio value={false}>Không tạo</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Nhân viên kinh doanh"
                                rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
                                name="saleStaff"
                            >
                                <Select>
                                    {deliveryOrderState.saleStaff.result === undefined
                                        ? null
                                        : deliveryOrderState.saleStaff.result.map((staff) => (
                                            <Option key={staff.userName} value={staff.userName}>
                                                {staff.fullName}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Số mã" name="id">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Ngày tạo"
                                name="orderDate"
                                rules={[{ required: true, message: "Vui lòng nhập ngày tạo" }]}
                            >
                                <DatePicker
                                    defaultValue={null}
                                    format={dateFormat}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Người gửi"
                                name="shipper"
                                rules={[{ required: true, message: "Vui lòng nhập người gửi" }]}
                            >
                                <Input placeholder="Nhập người gửi" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Người nhận"
                                name="consignee"
                                rules={[{ required: true, message: "Vui lòng nhập người nhận" }]}
                            >
                                <Input placeholder="Nhập người nhận" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Địa chỉ gửi"
                                name="fromAddress"
                                rules={[{ required: true, message: "Vui lòng nhập địa chỉ gửi" }]}
                            >
                                <Input placeholder="Nhập địa chỉ gửi" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="toAddress"
                                label="Địa chỉ nhận"
                                rules={[{ required: true, message: "Vui lòng nhập địa chỉ nhận" }]}
                            >
                                <Input placeholder="Nhập địa chỉ nhận" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Tỉnh"
                                name="provinceCode"
                                rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
                            >
                                <Select placeholder="Chọn tỉnh">
                                    {PROVINCE.map((province) => (
                                        <Option key={province.code} value={province.code}>
                                            {province.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Số điện thoại người gửi"
                                name="shipperPhone"
                                rules={[{ required: true, message: "Vui lòng số điện thoại người gửi" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Số điện thoại người nhận"
                                name="consigneePhone"
                                rules={[{ required: true, message: "Vui lòng số điện thoại người nhận" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hình thức nhận hàng" labelCol={{ span: 24 }} name="receiveType" wrapperCol={{ span: 24 }}>
                                <Select>
                                    <Option value="TN">Tận nơi</Option>
                                    <Option value="TK">Tại kho</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hình thức giao hàng" name="sendType" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Select>
                                    <Option value="TN">Tận nơi</Option>
                                    <Option value="TK">Tại kho</Option>
                                    <Option value="QL">Quốc lộ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hình thức thanh toán" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="paymentType">
                                <Select>
                                    <Option value="TTS">TTS</Option>
                                    <Option value="TDN">TĐN</Option>
                                    <Option value="DTT">ĐTT</Option>
                                    <Option value="Other">Khác</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Cước vận chuyển"
                                name="totalAmount"
                                rules={[{ required: true, message: "Vui lòng nhập cước vận chuyển" }]}
                            >
                                <InputNumber
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="Nhập cước vận chuyển"
                                    formatter={formatCurrency}
                                    parser={parseCurrency}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Cước vận tải"
                                name="additionalAmount"
                                rules={[{ required: true, message: "Vui lòng nhập cước vận tải" }]}
                            >
                                <InputNumber
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="Nhập cước vận tải"
                                    formatter={formatCurrency}
                                    parser={parseCurrency}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Card
                            className="cardRevision"
                            title="Tạo / Sửa đơn hàng"
                            bordered={false}
                            style={{
                                width: 775,
                                backgroundColor: "#cccc",
                            }}
                        >
                            <Form form={formDetailDelivery} name="formDetailDelivery">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            label="Tên hàng"
                                            name="name"
                                            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Khối lượng" name="mass">
                                            <InputNumber
                                                style={{
                                                    width: "100%",
                                                }}
                                                min={0}
                                                type="number"
                                            />
                                        </Form.Item>
                                        <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Đơn vị tính" name="unit">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Số lượng" name="quantity">
                                            <InputNumber
                                                style={{
                                                    width: "100%",
                                                }}
                                                min={0}
                                                type="number"
                                            />
                                        </Form.Item>
                                        <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Trọng lượng" name="weight">
                                            <InputNumber
                                                style={{
                                                    width: "100%",
                                                }}
                                                min={0}
                                                type="number"
                                            />
                                        </Form.Item>

                                        <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Ghi chú" name="note">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                            <Button
                                                style={{
                                                    backgroundColor: "#ffbd2f",
                                                    color: "#fff",
                                                }}
                                                onClick={addItemProducts}
                                            >
                                                Thêm
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Row>
                    <Table
                        className="tableRevision"
                        dataSource={deliveryOrderDetails.length >= 1 ? deliveryOrderDetails : null}
                        loading={deliveryOrderState.isLoading}
                        columns={columnsDetail}
                    />
                </Form>
            </Modal>
            <Modal
                title="THÔNG TIN HÌNH ẢNH"
                open={isDetailModalOpen}
                onCancel={() => setIsDetailModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Đóng
                    </Button>,
                    <Button type="primary" onClick={() => downloadImageProduct()}>
                        Tải ảnh xuống
                    </Button>,
                    <Button type="primary" onClick={() => uploadImageProduct()}>
                        Gửi hình ảnh
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <>
                        <p>
                            <strong>Tên hàng:</strong> {selectedOrder.name}
                        </p>
                        <p>
                            <strong>Hình thức thu tiền:</strong> {selectedOrder.paymentType}
                        </p>
                        <p>
                            <strong>NVKD:</strong> {selectedOrder.saleStaff}
                        </p>
                        <p>
                            <strong>Số tiền:</strong> {selectedOrder.totalAmount}
                        </p>
                        <div className="list-image">
                            {imageUrls.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Image ${index}`}
                                    style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                                />
                            ))}
                        </div>
                        <Upload beforeUpload={handleUpload} showUploadList={true} fileList={fileList}>
                            <Button>Tải lên ảnh</Button>
                        </Upload>
                    </>
                )}
            </Modal>
            <Modal title="Title" open={open} onOk={handleOkExport} confirmLoading={confirmLoading} onCancel={handleCancelExport}>
                <p>{modalText}</p>
            </Modal>
            <Modal title="BIÊN NHẬN VẬN CHUYỂN" visible={isModalOpenCode} onOk={handleOkCode} onCancel={handleCancelCode} width={1100}>
                <Row gutter={24}>
                    <Col span={12}>
                        <p>
                            <strong>MVĐ:</strong> {valueOrder?.payload?.result?.code}
                        </p>
                    </Col>
                    <Col span={6}>
                        <p>
                            <strong>Nhân viên kinh doanh:</strong> {valueOrder?.payload?.result?.saleStaff}
                        </p>
                    </Col>
                    <Col span={6}>
                        <p>
                            <strong>SĐT:</strong> {valueOrder?.payload?.result?.saleStaffPhone}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Người gửi:</strong> {valueOrder?.payload?.result?.shipper}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Người nhận:</strong> {valueOrder?.payload?.result?.consignee}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Địa chỉ gửi:</strong> {valueOrder?.payload?.result?.fromAddress}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Địa chỉ nhận:</strong>
                            {valueOrder?.payload?.result?.toAddress}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Số điện thoại gửi:</strong> {valueOrder?.payload?.result?.shipperPhone}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Số điện thoại nhân:</strong> {valueOrder?.payload?.result?.consigneePhone}
                        </p>
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Hai bên thống nhất lượng vận chuyển như sau</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Table
                            className="tableRevision"
                            dataSource={valueOrder?.payload?.result?.deliveryOrderDetails}
                            loading={deliveryOrderState.isLoading}
                            columns={columnsDetail.filter((cl) => cl.title !== "Thao tác")}
                        />
                    </Col>

                    <Col span={12}>
                        <p>
                            <strong>Cước vận chuyển:</strong> {valueOrder?.payload?.result?.totalAmount}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Hình thức thanh toán:</strong> {valueOrder?.payload?.result?.paymentType}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Hình nhận nhận hàng:</strong>
                            {valueOrder?.payload?.result?.receiveType === "TN"
                                ? "Tận nơi"
                                : valueOrder?.payload?.result?.receiveType === "TK"
                                    ? "Tại kho"
                                    : "Quốc lộ"}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <strong>Hình thức giao hàng:</strong> {valueOrder?.payload?.result?.sendType === "TN" ? "Tận nơi" : "Tại kho"}
                        </p>
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Giá bán:</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <table className="table_landing">
                            <tbody>
                                <tr>
                                    <th>Giá bán</th>
                                    <th>Thành tiền</th>
                                </tr>
                                <tr>
                                    <td>Bán ra</td>
                                    <td>{valueOrder?.payload?.result?.totalAmount}</td>
                                </tr>
                                <tr>
                                    <td>Phát sinh khác</td>
                                    <td>{valueOrder?.payload?.result?.additionalAmount}</td>
                                </tr>
                                <tr>
                                    <td>Tổng giá bán</td>
                                    <td>{valueOrder?.payload?.result?.totalAmount + valueOrder?.payload?.result?.additionalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Giá mua</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Trung chuyển</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Table
                            className="tableRevision"
                            dataSource={valueOrder?.payload?.result?.freightFees}
                            loading={deliveryOrderState.isLoading}
                            columns={fees}
                        />
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Phí nhận hàng</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Table
                            className="tableRevision"
                            dataSource={valueOrder?.payload?.result?.receivingFees}
                            loading={deliveryOrderState.isLoading}
                            columns={fees}
                        />
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Phí bo giao hàng</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Table
                            className="tableRevision"
                            dataSource={valueOrder?.payload?.result?.transborderFees}
                            loading={deliveryOrderState.isLoading}
                            columns={fees}
                        />
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Phí khác</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Table
                            className="tableRevision"
                            dataSource={valueOrder?.payload?.result?.otherFees}
                            loading={deliveryOrderState.isLoading}
                            columns={fees}
                        />
                    </Col>
                    <Col span={24}>
                        <p>
                            <strong>Thông tin tài xế</strong>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Table
                            className="tableRevision"
                            dataSource={valueOrder?.payload?.result?.ladingInfos}
                            loading={deliveryOrderState.isLoading}
                            columns={ladings}
                        />
                    </Col>
                </Row>
            </Modal>
            <Row>
                <Table
                    className="tableHome "
                    dataSource={deliveryOrderState?.allDeliveryOrder?.items}
                    loading={deliveryOrderState.isLoading}
                    columns={columns}
                    loadingText="Loading..."
                    scroll={{
                        x: 1300,
                    }}
                    pagination={{
                        size: "small",
                        pageSize: 10,
                        total: deliveryOrderState?.allDeliveryOrder?.total,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    onChange={(page) => handleChangePage(page)}
                />
            </Row>
        </div>
    );
};

export default Home;
