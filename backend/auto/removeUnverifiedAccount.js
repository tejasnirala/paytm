import cron from 'node-cron';
import { User } from '../models/index.js';

export const removeUnverifiedAccounts = () => {
  cron.schedule('*/30 * * * *', async()=>{
    const timeThirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    await User.deleteMany({
      accountVerified: false,
      createdAt: {
        $lt: timeThirtyMinutesAgo
      }
    });
  });
}