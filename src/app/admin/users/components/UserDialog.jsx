import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

const permissionSections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'services', name: 'Services' },
    { id: 'categories', name: 'Categories' },
    { id: 'tags', name: 'Tags' },
    { id: 'media', name: 'Media' }
];

const permissionTypes = [
    { id: 'view', label: 'View' },
    { id: 'add', label: 'Add' },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' }
];

export default function UserDialog({ open, onOpenChange, selectedUser, onCreate, onUpdate, isSubmitting, error, }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue, } = useForm();

    const watchRole = watch("role", "user");
    const watchPermissions = watch("permissions", {});

    useEffect(() => {
        if (open) {
            const defaultPermissions = {
                dashboard: { view: true },
                services: { view: true },
                categories: { view: true },
                tags: { view: true },
                media: { view: true }
            };

            if (selectedUser) {
                // Convert Map to object
                const permissionsObj = {};
                if (selectedUser.permissions instanceof Map) {
                    selectedUser.permissions.forEach((value, key) => {
                        permissionsObj[key] = Object.fromEntries(value.entries());
                    });
                }

                reset({
                    name: selectedUser.name || "",
                    email: selectedUser.email || "",
                    password: selectedUser.password || "",
                    role: selectedUser.role || "user",
                    permissions: permissionsObj || defaultPermissions
                });
            } else {
                reset({
                    name: "",
                    email: "",
                    role: "user",
                    permissions: defaultPermissions
                });
            }
        }
    }, [open, selectedUser, reset]);

    const handlePermissionChange = (section, type, checked) => {
        const newPermissions = { ...watchPermissions };
        if (!newPermissions[section]) newPermissions[section] = {};
        newPermissions[section][type] = checked;
        setValue("permissions", newPermissions);
    };

    const onSubmit = async (data) => {
        try {
            // Convert permissions to plain object (no Maps)
            const permissions = data.permissions;

            const userData = {
                ...data,
                permissions
            };

            if (selectedUser?._id) {
                await onUpdate({ id: selectedUser._id, data: userData });
            } else {
                await onCreate(userData);
            }
            onOpenChange(false);
        } catch (error) { }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
                    <DialogDescription>
                        Create or update user and assign roles and permissions.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        {/* Name */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="name" className="text-right mt-2">
                                Name<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    {...register("name", { required: "Name is required" })}
                                    className={clsx({ "border-red-500": errors.name })}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="email" className="text-right mt-2">
                                Email<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className={clsx({ "border-red-500": errors.email })}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="password" className="text-right mt-2">
                                Password<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className={clsx({ "border-red-500": errors.password })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Role */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="role" className="text-right mt-2">
                                Role<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <select
                                    id="role"
                                    {...register("role", { required: "Role is required" })}
                                    className={clsx("w-full border px-3 py-2 rounded", {
                                        "border-red-500": errors.role,
                                    })}
                                >
                                    <option value="user">User</option>
                                    <option value="sub-admin">Sub Admin</option>
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Permissions (only for sub-admin) */}
                        {watchRole === "sub-admin" && (
                            <div className="grid grid-cols-4 items-start gap-2">
                                <Label className="text-right mt-2">Permissions</Label>
                                <div className="col-span-3 space-y-4">
                                    {permissionSections.map((section) => (
                                        <div key={section.id} className="space-y-2">
                                            <h4 className="font-medium">{section.name}</h4>
                                            <div className="grid grid-cols-4 gap-4">
                                                {permissionTypes.map((type) => (
                                                    <div key={type.id} className="flex items-center gap-2">
                                                        <Checkbox
                                                            id={`${section.id}-${type.id}`}
                                                            checked={!!watchPermissions[section.id]?.[type.id]}
                                                            onCheckedChange={(checked) =>
                                                                handlePermissionChange(section.id, type.id, checked)
                                                            }
                                                        />
                                                        <Label htmlFor={`${section.id}-${type.id}`}>
                                                            {type.label}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-600 mb-5 text-sm">Error: {error}</p>}

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                            {selectedUser ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 