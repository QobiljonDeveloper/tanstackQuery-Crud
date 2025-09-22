import {
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  message,
  Tag,
  Space,
  InputNumber,
} from "antd";
import { memo, useEffect, useState } from "react";
import type { FormProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { usePhones, type Phone } from "../../api/hooks/usePhone";

const defaultImage =
  "data:image/png;base64,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";

type FieldType = {
  title: string;
  price: number;
  image: string;
  memories: string[];
  isDelivery: boolean;
};

const Header = ({
  selectedPhone,
  setSelectedPhone,
}: {
  selectedPhone: Phone | null;
  setSelectedPhone: (p: Phone | null) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const [memoryInput, setMemoryInput] = useState("");
  const [memories, setMemories] = useState<string[]>([]);

  const { createPhone, updatePhone } = usePhones();

  useEffect(() => {
    if (selectedPhone) {
      setIsModalOpen(true);
    }
  }, [selectedPhone]);

  useEffect(() => {
    if (isModalOpen && selectedPhone) {
      form.setFieldsValue(selectedPhone);

      setMemories(
        Array.isArray(selectedPhone.memories)
          ? selectedPhone.memories
          : selectedPhone.memories
          ? String(selectedPhone.memories).split(",")
          : []
      );
    }
  }, [isModalOpen, selectedPhone, form]);
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setMemories([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedPhone(null);
    setMemories([]);
  };

  const handleAddMemory = () => {
    if (memoryInput.trim()) {
      const newMem = memoryInput.trim();
      if (!memories.includes(newMem)) {
        setMemories([...memories, newMem]);
      }
      setMemoryInput("");
    }
  };

  const handleRemoveMemory = (mem: string) => {
    setMemories(memories.filter((m) => m !== mem));
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setSubmitting(true);

      const payload: Phone = {
        ...values,
        price: Number(values.price),
        memories,
        image: values.image?.trim() || defaultImage,
        id: selectedPhone?.id || "",
      };

      if (selectedPhone) {
        await updatePhone.mutateAsync({ ...selectedPhone, ...payload });
      } else {
        const { id, ...newPayload } = payload;
        await createPhone.mutateAsync(newPayload);
      }

      setIsModalOpen(false);
      form.resetFields();
      setSelectedPhone(null);
      setMemories([]);
    } catch (err) {
      console.error(err);
      message.error("Failed to save Phone");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <header className="bg-gray-800">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <h3 className="text-white text-3xl">Phone Crud</h3>

          <Button type="primary" onClick={showModal}>
            +
          </Button>

          <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
            <Form
              form={form}
              name="create-phone"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{ isDelivery: false }}
            >
              <Form.Item<FieldType>
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter Title name" }]}
              >
                <Input placeholder="Enter Title" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter Price" }]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Enter Price"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item<FieldType> label="Image" name="image">
                <Input placeholder="Enter Image Url" />
              </Form.Item>

              <Form.Item label="Memories" required>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    value={memoryInput}
                    onChange={(e) => setMemoryInput(e.target.value)}
                    placeholder="Enter memory and click Add"
                    onPressEnter={handleAddMemory}
                  />
                  <Button type="primary" onClick={handleAddMemory}>
                    <PlusOutlined /> Add
                  </Button>
                </Space.Compact>

                <div className="mt-2 flex flex-wrap gap-2">
                  {memories.map((mem) => (
                    <Tag
                      key={mem}
                      closable
                      onClose={() => handleRemoveMemory(mem)}
                    >
                      {mem}
                    </Tag>
                  ))}
                </div>
              </Form.Item>

              <Form.Item<FieldType> name="isDelivery" valuePropName="checked">
                <Checkbox>Is Delivery?</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting
                    ? selectedPhone
                      ? "Updating..."
                      : "Creating..."
                    : selectedPhone
                    ? "Update"
                    : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
