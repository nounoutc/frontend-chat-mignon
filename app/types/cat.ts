export type CatCardProps = {
    id: number;
    url: string;
    onVote: (id: number) => void;
};
export type Cat = { id: number; url: string; score: number };
