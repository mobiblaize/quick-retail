import { Button } from "@mantine/core";
import PermissionGroup from "./permissionGroup";
import { useNavigate } from "react-router";

export default function PointOfSalesPermissions() {
    const navigate = useNavigate();

    return (
        <>
            {/* Dashboard */}
            <PermissionGroup
                title="Dashboard"
                description="This contains analytics on sales revenue, products, customers etc."
            />

            {/* Products */}
            <PermissionGroup
                title="Products"
                description="View all products and manage products."
            />

            {/* Sales */}
            <PermissionGroup
                title="Sales"
                description="Manage sales and create sales order on sales."
                collapsible
            >
                <PermissionGroup
                    title="Sales dashboard"
                    description="View sales data and reports."
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Create sales order"
                    description="Sell products and print receipts in create sales order"
                    viewable
                    editable={false}
                />
            </PermissionGroup>

            {/* Inventory */}
            <PermissionGroup
                title="Inventory"
                description="Manage stock and reorder stock on inventory."
            />

            {/* Category */}
            <PermissionGroup
                title="Category"
                description="Create and manage categories."
            />

            {/* Returns */}
            <PermissionGroup
                title="Returns and Refund"
                description="Oversee returns and manage refund processes efficiently."
                collapsible
            >
                <PermissionGroup
                    title="Returns and Refund dashboard"
                    description="View returns and refund data and reports."
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Log returns"
                    description="Sell products and print receipts in create sales order"
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Resolve or decline refunds"
                    description="Take action on logged returns"
                    viewable
                    editable={false}
                />
            </PermissionGroup>

            {/* Customer */}
            <PermissionGroup
                title="Customer"
                description="Add and manage customer details"
            />

            {/* Discounts */}
            <PermissionGroup
                title="Discounts"
                description="Oversee discount data and reports  and create discounts."
                collapsible
            >
                <PermissionGroup
                    title="Discounts dashboard"
                    description="View discounts dashboard data."
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Create discounts on products"
                    description="Create discounts on products"
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Take action on discounts"
                    description="Deactivate and activate discounts"
                    viewable
                    editable={false}
                />
            </PermissionGroup>

            {/* Transactions */}
            <PermissionGroup
                title="Transactions"
                description="View transactions and download receipts"
            />

            {/* Stores */}
            <PermissionGroup
                title="Stores"
                description="Oversee discount data and reports  and create discounts."
                collapsible
            >
                <PermissionGroup
                    title="Stores dashboard"
                    description="View stores data and reports."
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Create stores"
                    description="Create stores for your business"
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Take action on stores"
                    description="Deactivate and activate stores"
                    viewable
                    editable={false}
                />
            </PermissionGroup>

            {/* User and role management */}
            <PermissionGroup
                title="User and Role Management"
                description="Manage users and roles in the system."
                collapsible
            >
                <PermissionGroup
                    title="Users dashboard"
                    description="View user data and roles."
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Create users and roles"
                    description="Create stores for your business."
                    viewable
                    editable={false}
                />
                <PermissionGroup
                    title="Take action on users and roles"
                    description="Deactivate and activate users and roles"
                    viewable
                    editable={false}
                />
            </PermissionGroup>

            {/* Reports */}
            <PermissionGroup
                title="Reports"
                description="Generate, view and download reports."
            />

            <div
                key="search-product-buttons"
                className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
            >
                <Button variant="outline-primary" onClick={() => navigate(-1)}>
                    Cancel
                </Button>

                <Button variant="filled-primary">
                    Continue
                </Button>
            </div>
        </>
    );
}
