import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpsertVisionDto } from '../dto/upsert-vision.dto';
import { IVision } from '../interfaces/interface/vision.interface';
import { VisionService } from '../service/vision.service';
import { FastifyReply } from 'fastify';

@Controller('vision')
export class VisionController {
  constructor(private readonly visionService: VisionService) {}

  @Get()
  async findVision(
    @Req() req,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IVision> {
    return await this.visionService.findVision(req.user._id);
  }

  @Post()
  async upsertVision(
    @Req() req,
    @Body() upsertVisionDto: UpsertVisionDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<any> {
    const vision = await this.visionService.upsertVision({
      _id: req.user._id,
      ...upsertVisionDto,
    });

    res.status(200).send({ vision });
  }
}
