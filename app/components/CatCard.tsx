import { CatCardProps } from "../types/cat";

export default function CatCard({ id, url, onVote }: CatCardProps) {
    return (
        <div className="cat-card">
            <img src={url} alt={`Chat ${id}`} />
            <div className="content">
                <button onClick={() => onVote(id)}>Voter 🐾</button>
            </div>
        </div>
    );
}
