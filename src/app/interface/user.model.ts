export interface User {
    localId: string,
    email: string,
    displayName: string,
    photoUrl: string,
    emailVerified: boolean,
    passwordUpdatedAt: number,

}

export interface Article {
    id: number,
    title: string,
    thumbnail: string,
    description: string,
    author: string,
    publishDate: string,
    featured: boolean,
    views: number,
    comment?:[]
}
export interface ArticleData {
    articles: Array<Article>,
    total: number
}