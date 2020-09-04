const dummy = (blogs) => {
    return blogs.length;
}

const totalLikes = (blogs) => {
    let blogLikeCount = 0;

    if (blogs.length === 0) return 0;
    if (blogs.length > 1) {
        var bloglist = blogs.forEach(blog => {
            blogLikeCount += blog.likes;
        })
        return blogLikeCount;
    }

    return blogs.find(x => x.likes > 0).likes;
}

const mostBlogs = (blogs) => {
    let counts = [];
    blogs.forEach(x => counts[x.author] = (counts[x.author] || 0) + 1);
    
    // counts = counts.reduce((prev, curr) => (curr > prev) ? curr : prev);

    return counts;
}

const mostLikes = (blog) => {

}

module.exports = {dummy, totalLikes, mostBlogs, mostLikes}
