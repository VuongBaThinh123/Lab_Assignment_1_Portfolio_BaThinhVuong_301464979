import RowComponent from "./RowComponent";

function ListComponent({ items }) {
    return (
        <div>
            {items.map((item, index) => (
                <RowComponent key={index} itemObject={item} />
            ))}
        </div>
    );
}

export default ListComponent;
