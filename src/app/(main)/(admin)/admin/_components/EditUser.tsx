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
import { Pencil } from "lucide-react";

import { IUser,  } from "@/src/types";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableSelect from "@/src/components/ui/ReusableSelect";

export default function EditUser({id,data}:{id:string,data:IUser}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   console.log("--->",data);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
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
                <h1 className="text-center font-medium text-xl">Edit User Credential</h1>
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
                      label="Role"
                      name="role"
                      defaultValue={data?.role}
                      options={[
                        { key: "ADMIN", label: "Admin" },
                        { key: "USER", label: "User" },
                      ]}
                    />
                    <Button className="w-full" color="primary" type="submit">
                      Edit
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
