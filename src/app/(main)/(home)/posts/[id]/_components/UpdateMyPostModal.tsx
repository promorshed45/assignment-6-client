'use client';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import ReusableInput from "@/src/components/ui/ReusableInput";
import { useUpdatePost } from "@/src/hooks/post/post.hook";
import ReusableSelect from "@/src/components/ui/ReusableSelect";

interface FormInputs {
  title: string;
  description: string;
  category: string;
}

const categoriesList = [
  "Business Travel",
  "Exploration",
  "Travel Tips",
  "Cultural Experiences",
  "Destination Guides",
  "Food And Drink",
  "Adventure Activities",
];

const UpdateMyPostModal = ({ id, post, isOpen, onClose }: { id: string; post: any; isOpen: boolean; onClose: () => void; }) => {
  const { mutate: handlePostUpdate } = useUpdatePost();

  const methods = useForm<FormInputs>({
    defaultValues: {
      title: post?.title || '',
      description: post?.description || '',
      category: post?.category || "",
    },
  });

  const { handleSubmit } = methods;
  

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const payload = {
      title: data.title,
      description: data.description,
      category: data.category
    }
    console.log(id, payload);
    handlePostUpdate({ id, payload });
    onClose();
};

const formattedCategoriesList = categoriesList.map((category) => ({
  key: category,
  label: category,
}));

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent className="m-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <div className="flex flex-col gap-4 mt-3">
                <ReusableInput label="Title" name="title" type="text" />
                <ReusableInput label="Description" name="description" type="textarea" />
                <ReusableSelect
                  label="Category"
                  name="category"
                  options={formattedCategoriesList}
                  size="sm"
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center gap-8">
              <Button className="bg-green-500" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMyPostModal;
