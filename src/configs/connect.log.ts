import mongoose from 'mongoose';
import colors from 'colors';
const connectLogs = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(colors.green('Connect MongoDB successfully!!'));
    } catch (error) {
        console.log(error);
        console.error(colors.red('Connect MongoDB failed!!'));
        process.exit(1);
    }
};
process.on('SIGINT', async (): Promise<void> => {
    console.log(colors.red('You are performing a server shutdown MongoDB!'));
    await mongoose.connection.close();
    process.exit(0);
});

export default connectLogs;
