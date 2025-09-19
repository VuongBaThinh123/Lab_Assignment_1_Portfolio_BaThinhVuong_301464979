function RowComponent({ itemObject }) {
    return (
        <div className="row">
            <a href={itemObject.link} target="_blank" rel="noopener noreferrer">
                <img src={itemObject.imagePath} alt={itemObject.title} />
                <div className="text-content">
                    <h3>{itemObject.title}</h3>
                    <p>{itemObject.text}</p>
                </div>
            </a>
        </div>
    );
}

export default RowComponent;
