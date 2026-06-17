import CommentEditModal from "./CommentEditModal";
import DeleteComment from "./DeleteComment";


const CommentUi = ({comments}) => {
    
    return (
       <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
    {comments.length === 0 ? (
      <p className="text-zinc-500 text-center py-4 text-sm">No comments yet. Be the first to start the discussion! </p>
    ) : (
      comments.map((comment) => (
        <div 
          key={comment._id}
          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col gap-2.5 transition-all"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                {comment.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-bold text-zinc-950 dark:text-white">
                {comment.email}
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                • {new Date(comment.createdAt || Date.now()).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CommentEditModal comment={comment}></CommentEditModal>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <DeleteComment comment={comment}></DeleteComment>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-9">
            {comment.text}
          </p>
        </div>
      ))
    )}
    </div>
    );
};

export default CommentUi;