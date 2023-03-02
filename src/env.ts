import { config } from 'dotenv';
import type { ZodFormattedError } from 'zod';
import { z } from 'zod';

// Default to "development" environment
const currentEnv = process.env.NODE_ENV ?? 'development';
const currentEnvFilePath = currentEnv === 'production' ? '.env' : `.env.${currentEnv}`;
if (currentEnv !== 'test') console.info(`🚀 Starting bot in "${currentEnv}" mode, using ${currentEnvFilePath}`);

// Load environment variables from .env file
config({ path: currentEnvFilePath });

export const formatErrors = (
    errors: ZodFormattedError<Map<string, string>, string>
) =>
    Object.entries(errors)
        .map(([name, value]) => {
            if (value && '_errors' in value)
                return `${name}: ${value._errors.join(', ')}\n`;
        })
        .filter(Boolean);

/**
 * Specify your environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const schema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    TWITCH_USERNAME: z.string(),
    TWITCH_ACCESS_TOKEN: z.string(),
    TWITCH_CHANNEL: z.string(),
});

/**
 * This is the actual environment variables object.
 * It will be validated against the schema above.
 */
export const serverEnv = {
    NODE_ENV: process.env.NODE_ENV,
    TWITCH_USERNAME: process.env.TWITCH_USERNAME,
    TWITCH_ACCESS_TOKEN: process.env.TWITCH_ACCESS_TOKEN,
    TWITCH_CHANNEL: process.env.TWITCH_CHANNEL,
} satisfies Record<keyof z.infer<typeof schema>, z.infer<typeof schema>[keyof z.infer<typeof schema>] | undefined>;

const _Env = schema.safeParse(serverEnv);

if (!_Env.success) {
    console.error(
        '❌ Invalid environment variables:\n',
        ...formatErrors(_Env.error.format()),
    );
    throw new Error('Invalid environment variables');
}

export const env = _Env.data;
