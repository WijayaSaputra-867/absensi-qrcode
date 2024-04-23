import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { FaTrashAlt } from "react-icons/fa";

export default function UserDeleteForm({ user, className = "" }) {
    // const user = usePage().props.user;

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    const { delete: destroy, processing, reset } = useForm();

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("users.destroy", user), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div>
            <button className={className} onClick={confirmUserDeletion}>
                <FaTrashAlt className="mx-auto h-4 w-4" />
            </button>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form className="p-6" onSubmit={deleteUser}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Delete User
                    </h2>
                    <p className="mt-1 text-base text-gray-600">
                        Are you sure want to delete this user?
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
