import { jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { type APIEmbed } from "discord-api-types/v10";
import { relations } from "drizzle-orm";
import { guildSetting } from "./schema";

export const quickMessage = pgTable("quick_message", {
	guildId: text("guildId").notNull(),
	channelId: text("channelId").notNull(),
	messageId: text("messageId"),
	messageName: text("messageName").notNull(),
	messageUUID: text("messageUUID").notNull(),
	messageData: jsonb("messageData").notNull().$type<{
		content: string;
		embeds: Array<APIEmbed>;
	}>(),
});

export const quickMessageRelations = relations(quickMessage, ({ one }) => ({
	guildsSettings: one(guildSetting, {
		fields: [quickMessage.guildId],
		references: [guildSetting.guildId],
		relationName: "quickMessages",
	}),
}));
