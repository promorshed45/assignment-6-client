/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-sort-props */
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Pencil } from "lucide-react";

import { TPost } from "@/src/types";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableSelect from "@/src/components/ui/ReusableSelect";
import { useUpdatePost } from "@/src/hooks/post/post.hook";

export default function AdminUpdatePost({ id, data, }: { id: string; data: TPost; }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: handleUpdatePost } = useUpdatePost();

  const handleSubmit = (data: TPost) => {
    // console.log(id, data);
    handleUpdatePost({ id: id, payload: data });
  };

  return (
    <>
      <Button onPress={onOpen} size="sm" variant="flat" className="text-xl">
        <Pencil className="size-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="mt-8">
                <h1 className="text-center font-medium text-xl">Update Post</h1>
                <ReusableForm onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    
                    <ReusableSelect
                      size="sm"
                      label="Post Type"
                      name="type"
                      defaultValue={data?.status}
                      options={[
                        { key: "Premium", label: "PREMIUM" },
                        { key: "Free", label: "FREE" },
                      ]}
                    />
                    <Button className="w-full" color="primary" type="submit">
                      update
                    </Button>
                  </div>
                </ReusableForm>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
