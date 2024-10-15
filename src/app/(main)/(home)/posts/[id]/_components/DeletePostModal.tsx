'use client';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useDeletePost } from "@/src/hooks/post/post.hook";

const DeletePostModal = ({ postId, isOpen, onClose }: { postId: string; isOpen: boolean; onClose: () => void; }) => {
    const { mutate: handleDeletePost, isLoading, isSuccess } = useDeletePost();
    const router = useRouter();

    const handleSubmit = () => {
        handleDeletePost({ postId });
    };

    useEffect(() => {
        if (!isLoading && isSuccess) {
            router.push("/posts");
        }
    }, [isLoading, isSuccess]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="space-y-3">
                <ModalHeader className="flex flex-col items-center gap-1 text-rose-500">Are you sure?</ModalHeader>
                <ModalBody>
                    <p className="text-center">You won't be able to revert this!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                        Close
                    </Button>
                    <Button color="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeletePostModal;
