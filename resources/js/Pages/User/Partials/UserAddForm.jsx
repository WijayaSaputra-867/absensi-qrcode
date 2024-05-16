import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";

export default function UserAddForm({ className = "", nextForm = false }) {
    const user = usePage().props.user;
    const { data, setData, post, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"));
        reset();
    };

    var changeClassName = {
        className: "mt-1 block w-full",
    };

    if (nextForm == true) {
        changeClassName.className = "mt-1 block w-full cursor-not-allowed";
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    User Add Form
                </h2>
                <p className="text-base text-gray-600">Add a new user</p>
            </header>                                                                                                                                                                                    
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        {...changeClassName}
                        value={data.name}
                        disabled={nextForm}
                        readOnly={nextForm}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        {...changeClassName}
                        value={data.email}
                        disabled={nextForm}
                        readOnly={nextForm}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        {...changeClassName}
                        value={data.password}
                        disabled={nextForm}
                        readOnly={nextForm}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>
                {nextForm == false && (
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Password Confirmation"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.password_confirmation}
                        />
                    </div>
                )}
                {nextForm == false && (
                    <div className="flex items-center gap-4">
                        <PrimaryButton>Next</PrimaryButton>
                    </div>
                )}
            </form>
        </section>
    );
}
