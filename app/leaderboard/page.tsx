"use client";
import { useEffect, useState, useMemo } from "react";
import { Cat } from "../types/cat";

export default function LeaderboardPage() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cats`)
            .then((res) => res.json())
            .then((data) => {
                setCats(data);
            });
    }, []);

    // Tri des chats par score décroissant
    const sortedCats = useMemo(() => {
        return [...cats].sort((a, b) => b.score - a.score);
    }, [cats]);

    // Pagination
    const totalPages = Math.ceil(sortedCats.length / ITEMS_PER_PAGE);
    const paginatedCats = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedCats.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedCats, currentPage]);

    if (cats.length === 0) return <p>Chargement...</p>;
    // Générer la pagination avec ellipses
    const getPageNumbers = () => {
        const pages = [];
        const delta = 2; // nombre de pages visibles autour de la page actuelle

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }
        return pages;
    };
    return (
        <div className="leaderboard-container">
            {/* Top 3 */}
            {sortedCats.length >= 3 && (
                <div className="top-three">
                    <div className="cat">
                        <div>02</div>
                        <img src={sortedCats[1].url} alt="" />
                        <div className="score">{sortedCats[1].score}</div>
                    </div>
                    <div className="cat" style={{ transform: "scale(1.2)" }}>
                        <div>01</div>
                        <img src={sortedCats[0].url} alt="" />
                        <div className="score">{sortedCats[0].score}</div>
                    </div>
                    <div className="cat">
                        <div>03</div>
                        <img src={sortedCats[2].url} alt="" />
                        <div className="score">{sortedCats[2].score}</div>
                    </div>
                </div>
            )}

            {/* Liste paginée */}
            <div className="leaderboard-list">
                {paginatedCats.map((cat, index) => (
                    <div key={cat.id} className="leaderboard-item">
                        <div className="rank">
                            {String((currentPage - 1) * ITEMS_PER_PAGE + index + 1).padStart(
                                2,
                                "0"
                            )}
                        </div>
                        <div className="cat-image">
                            <img src={cat.url} alt="" />
                        </div>
                        <div className="score">{cat.score}</div>
                    </div>
                ))}
            </div>

            {/* Pagination numérotée */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                {getPageNumbers().map((page, idx) => (
                    <button
                        key={idx}
                        disabled={page === "..."}
                        onClick={() => page !== "..." && setCurrentPage(page as number)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            backgroundColor: page === currentPage ? "#333" : "#fff",
                            color: page === currentPage ? "#fff" : "#333",
                            border: "1px solid #ccc",
                            cursor: page === "..." ? "default" : "pointer"
                        }}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}
