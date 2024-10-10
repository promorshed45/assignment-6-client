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
  import { FieldValues, SubmitHandler } from "react-hook-form";
  import { toast } from "sonner";
import { Edit } from "lucide-react";

  import { TPost, TResponse } from "@/src/types";
  import { useUpdateSpecificPostMutation } from "@/src/redux/features/post/postApi";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableSelect from "@/src/components/ui/ReusableSelect";
  
  export default function AdminUpdatePost({
    id,
    data,
  }: {
    id: string;
    data: TPost;
  }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // update post
    const [updatePost, { isSuccess }] = useUpdateSpecificPostMutation();
  
    //   console.log("--->",data);
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading("updating....");
      try {
        const payload = {
          id,
          updateInFo: data,
        };
      //   console.log(payload);
          const res = (await updatePost(payload)) as TResponse<any>;
          if (res?.data) {
            toast.success("updated success",{id:toastId,duration:1000});
            onOpenChange();
          } else {
            toast.error(res?.error?.data?.message,{id:toastId});
          }
      } catch (error: any) {
        toast.error(error?.message, { id: toastId });
      }
    };
  
    return (
      <>
        <Button onPress={onOpen} size="sm" variant="flat" className="text-xl">
          <Edit />
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
                        label="Status"
                        name="status"
                        defaultValue={data?.status}
                        options={[
                          { key: "Active", label: "Active" },
                          { key: "Blocked", label: "Blocked" },
                        ]}
                      />
                      <ReusableSelect
                        size="sm"
                        label="Post Type"
                        name="type"
                        defaultValue={data?.type}
                        options={[
                          { key: "Premium", label: "Premium" },
                          { key: "Non-Premium", label: "Non-Premium" },
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
  