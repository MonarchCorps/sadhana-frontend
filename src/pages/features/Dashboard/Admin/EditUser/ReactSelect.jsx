/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { components } from 'react-select'

function ReactSelect(user) {

    const options = [
        { value: parseInt(import.meta.env.VITE_USER_CODE), label: 'User' },
        { value: parseInt(import.meta.env.VITE_INSTRUCTOR_CODE), label: 'Instructor' },
        { value: parseInt(import.meta.env.VITE_ADMIN_CODE), label: 'Admin' },
    ];

    useEffect(() => {
        if (user?.roles) {
            const assignedRoles = Object.keys(user.roles)
                .map((role) => {
                    const value = user.roles[role];
                    return options.find((option) => option.value === value);
                })
                .filter((role) => role !== undefined);

            setSelectedRoles(assignedRoles);
        }
    }, [user]);

    const [selectedRoles, setSelectedRoles] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [isClearAll, setIsClearAll] = useState(false);

    const handleRoleChange = (newValue) => {
        const fixedRole = options.find((option) => option.value === parseInt(import.meta.env.VITE_USER_CODE));
        if (!newValue.some((role) => role.value === parseInt(import.meta.env.VITE_USER_CODE))) {
            newValue = [...newValue, fixedRole];
        }

        const hasAdmin = newValue.some((role) => role.value === parseInt(import.meta.env.VITE_ADMIN_CODE));
        const hasInstructor = newValue.some((role) => role.value === parseInt(import.meta.env.VITE_INSTRUCTOR_CODE));

        if (hasAdmin && !hasInstructor) {
            newValue = [...newValue, options.find((option) => option.value === parseInt(import.meta.env.VITE_INSTRUCTOR_CODE))];
        }

        setSelectedRoles(newValue);
    };

    const handleRemoveRole = (role) => {
        setRoleToDelete(role);
        setIsModalOpen(true);
    };

    const confirmRemoveRole = () => {
        if (isClearAll) {
            setSelectedRoles([options.find((option) => option.value === parseInt(import.meta.env.VITE_USER_CODE))]);
            setIsClearAll(false);
        } else {
            setSelectedRoles((prevRoles) => prevRoles.filter((role) => role.value !== roleToDelete.value));
        }
        setIsModalOpen(false);
        setRoleToDelete(null);
    };

    const cancelRemoveRole = () => {
        setIsModalOpen(false);
        setRoleToDelete(null);
        setIsClearAll(false);
    };

    const MultiValueRemove = (props) => {
        const { data } = props;
        if (data.value === parseInt(import.meta.env.VITE_USER_CODE)) {
            return null; // Disable removing the "User" role
        }
        return (
            <components.MultiValueRemove
                {...props}
                innerProps={{
                    ...props.innerProps,
                    onClick: (e) => {
                        e.preventDefault();
                        handleRemoveRole(data);
                    },
                }}
            />
        );
    };

    const ClearIndicator = (props) => {
        return (
            <components.ClearIndicator
                {...props}
                innerProps={{
                    ...props.innerProps,
                    onMouseDown: (e) => {
                        e.preventDefault();
                        setIsClearAll(true);
                        setIsModalOpen(true);
                    },
                }}
            />
        );
    };

    return {
        selectedRoles, isModalOpen, handleRoleChange, confirmRemoveRole, cancelRemoveRole, MultiValueRemove, ClearIndicator, options, roleToDelete, isClearAll
    }
}

export default ReactSelect;
