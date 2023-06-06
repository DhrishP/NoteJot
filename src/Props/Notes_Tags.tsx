export type Note = {
    id:string,
} & NoteProps

export type NoteProps = { 
    title:string,
    body:string,
    tags:Tag[]
}

export type Tag = {
    id:string,
    label:string,
}

export type LocalStorageNotes = {
    id:string,
} & LocalStorageNotesProps

export type LocalStorageNotesProps = {
    title:string,
    body:string,
    tagIds:string[]
}