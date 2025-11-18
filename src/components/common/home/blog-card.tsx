import { Share2, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  date: string;
  month: string;
  category: string;
  categoryColor: string;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  image: string; 
  imageHeight: string;
  to: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-border/50">

      <div className={`${post.imageHeight} relative overflow-hidden`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg z-10 border-2 border-white">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground leading-none">
              {post.date}
            </div>
            <div className="text-xs font-bold text-foreground uppercase tracking-wider">
              {post.month}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span
            className={`${post.categoryColor} text-white text-xs font-bold px-4 py-2 rounded-full inline-block shadow-md`}
          >
            {post.category}
          </span>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground pb-4 border-b border-border/30">
          <div className="w-7 h-7 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">D</span>
          </div>
          <span className="font-medium text-foreground">{post.author}</span>
          <span className="text-border">•</span>
          <span className="text-xs">{post.publishDate}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow">
          {post.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <Link
            to={post.to}
            className="text-green-600 font-bold text-sm hover:text-green-700 flex items-center gap-2 group/link transition-all"
          >
            ĐỌC TIẾP
            <ArrowRight
              size={16}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-2 transition-all">
              <MessageCircle size={18} />
            </button>
            <button className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-2 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
