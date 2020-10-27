function Left() {
    return (
        <div className="logo">
            <a href={process.env.PUBLIC_URL+ '#'} className="noLink">
                <button>GuildScript</button>
            </a>
        </div>
    )
}

function Header() {
    return (
        <div className="header">
            <Left />
        </div>
    )
}
export default Header