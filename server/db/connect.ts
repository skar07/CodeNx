import mongoose, {connect} from 'mongoose'

export function connectDB(url: string):Promise<typeof mongoose>{
    return connect(url)
}