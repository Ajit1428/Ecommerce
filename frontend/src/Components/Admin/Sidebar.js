import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import {
    MdExpandMore,
    MdPostAdd,
    MdAdd,
    MdImportExport,
    MdListAlt,
    MdDashboard,
    MdPeople,
    MdRateReview,
} from "react-icons/md";
import { FaShopware } from "react-icons/fa";

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <Link to="/admin/dashboard">
                    <p>
                        <MdDashboard /> Dashboard
                    </p>
                </Link>
                <Link>
                    <TreeView
                        defaultCollapseIcon={<MdExpandMore />}
                        defaultExpandIcon={<MdImportExport />}
                    >
                        <TreeItem nodeId="1" label="Products">
                            <Link to="/admin/products">
                                <TreeItem
                                    nodeId="2"
                                    label="All"
                                    icon={<MdPostAdd />}
                                />
                            </Link>

                            <Link to="/admin/product">
                                <TreeItem
                                    nodeId="3"
                                    label="Create"
                                    icon={<MdAdd />}
                                />
                            </Link>
                        </TreeItem>
                    </TreeView>
                </Link>
                <Link to="/admin/orders">
                    <p>
                        <MdListAlt />
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                        <MdPeople /> Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                        <MdRateReview />
                        Reviews
                    </p>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;
