import Card from "./Card.jsx";

function CardsSection({ data, title }) { 
    return (
    <section>
        <h2 className="text-xl font-semibold mb-3">{ title }</h2>
        <div className="flex flex-col gap-4">
            {data.map(el => <Card key={el.id} item={el} />)}
        </div>
    </section>
)};

export default CardsSection;