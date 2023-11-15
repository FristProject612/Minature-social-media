export default function PostBox(){
    return (
        <div className="form-floating Container mt-5">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea">Comments</label>
        </div>
    )
}