"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const linkStyle = (path: string) => ({
        padding: "10px 15px",
        textDecoration: "none",
        color: pathname === path ? "#fff" : "#00b4ff",
        backgroundColor: pathname === path ? "#00b4ff" : "transparent",
        borderRadius: "5px",
        transition: "0.3s"
    });

    return (
        <nav style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "15px",
            borderBottom: "2px solid #eee",
            marginBottom: "20px"
        }}>
            <Link href="/" style={linkStyle("/")}>Vote</Link>
            <Link href="/leaderboard" style={linkStyle("/leaderboard")}>Classement</Link>
        </nav>
    );
}
