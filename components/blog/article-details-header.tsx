import { Article } from "@/lib/validation";
import { format } from "date-fns";

interface Props {
    article: Article
}

export function ArticleDetailsHeader({ article }: Props) {
    return (
        <div className="flex flex-col gap-4 lg:gap-6 lg:pr-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
                <div className="bg-muted text-foreground rounded-2xl px-3 py-2">
                    {article.category}
                </div>
                <div data-testid="date">
                    {format(article.publishedAt, "EEEE, MMMM io yyyy")}
                </div>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold first-letter:uppercase" data-testid="title">
                {article.title}
            </h1>
            <h2 className="text-lg lg:text-xl text-muted-foreground">{article.description}</h2>
        </div>
    )
}