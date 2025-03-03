import React from "react";
import PropTypes from "prop-types";

const Table = ({ data, columns }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} style={{ width: column.width }}>
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} style={{ width: column.width }}>
                                {row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onDelete: PropTypes.func, // Optional prop
    onEdit: PropTypes.func, // Optional prop
    onView: PropTypes.func, // Optional prop
};

Table.defaultProps = {
    showActions: false, // Default to no actions
};

export default Table;
