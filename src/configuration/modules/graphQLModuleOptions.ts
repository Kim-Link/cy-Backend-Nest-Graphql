import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request } from 'express';
import {
  GqlModuleAsyncOptions,
  GqlModuleOptions,
  GqlOptionsFactory,
  SubscriptionConfig,
} from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      path: this.config.get<string>('GRAPHQL_PATH'),
      sortSchema: true,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: apolloContextOptions,
      subscriptions: subscriptionConfig,
    };
  }
}

export const GqlModuleAsyncOption: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useClass: GraphQLService,
};

export const apolloContextOptions = async ({ req }: { req: Request }) => ({
  ...req,
  token: req.headers.authorization,
  refresh: req.headers.refreshToken,
});

export const subscriptionConfig: SubscriptionConfig = {
  'graphql-ws': true,
};
