function Header() {
    const person = [
        {
            name: "Ram",
            age: 25,
            city: "Kathmandu"
        },
        {
            name: "Shyam",
            age: 30,
            city: "Pokhara"
        },
        {
            name: "Sita",
            age: 28,
            city: "Bharatpur"
        }
    ]

    return (
        <div className="header">
            <h1>Hi {person[0].name}! You are {person[0].age} years old and live in {person[0].city}.</h1>
            <h1>Hi {person[1].name}! You are {person[1].age} years old and live in {person[1].city}.</h1>
            <h1>Hi {person[2].name}! You are {person[2].age} years old and live in {person[2].city}.</h1>
        </div>
    )
}

export default Header