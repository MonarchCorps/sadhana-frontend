/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { components } from 'react-select'

function ReactSelect(user) {

    const options = [
        { value: 2001, label: 'User' },
        { value: 1984, label: 'Instructor' },
        { value: 5150, label: 'Admin' },
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
        const fixedRole = options.find((option) => option.value === 2001);
        if (!newValue.some((role) => role.value === 2001)) {
            newValue = [...newValue, fixedRole];
        }

        const hasAdmin = newValue.some((role) => role.value === 5150);
        const hasInstructor = newValue.some((role) => role.value === 1984);

        if (hasAdmin && !hasInstructor) {
            newValue = [...newValue, options.find((option) => option.value === 1984)];
        }

        setSelectedRoles(newValue);
    };

    const handleRemoveRole = (role) => {
        setRoleToDelete(role);
        setIsModalOpen(true);
    };

    const confirmRemoveRole = () => {
        if (isClearAll) {
            setSelectedRoles([options.find((option) => option.value === 2001)]);
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
        if (data.value === 2001) {
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
