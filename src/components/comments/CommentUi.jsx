import CommentEditModal from "./CommentEditModal";
import DeleteComment from "./DeleteComment";


const CommentUi = ({comments, setComments}) => {
    
    return (
   <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
  {comments.length === 0 ? (
    <p className="text-zinc-500 text-center py-4 text-sm">No comments yet. Be the first to start the discussion! </p>
  ) : (
    comments.map((comment) => (
      <div 
        key={comment._id}
        className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col gap-3 transition-all"
      >
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <div className="w-7 h-7 rounded-full bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
            {comment.name?.charAt(0) || "U"}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 min-w-0">
            <span className="text-sm font-bold text-zinc-950 dark:text-white truncate max-w-[200px] sm:max-w-none">
              {comment.email}
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
              • {new Date(comment.createdAt || Date.now()).toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-0 sm:pl-9 break-words">
          {comment.text}
        </p>
        <div className="flex items-center gap-2 text-xs font-semibold pl-0 sm:pl-9 mt-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/40 w-full justify-start">
          <CommentEditModal comment={comment} setComments={setComments}></CommentEditModal>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <DeleteComment comment={comment} setComments={setComments}></DeleteComment>
        </div>

      </div>
    ))
  )}
</div>
    );
};

export default CommentUi;