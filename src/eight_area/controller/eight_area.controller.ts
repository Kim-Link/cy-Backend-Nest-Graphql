import { Controller, Injectable } from '@nestjs/common';
import { EightAreaService } from '../service/eight_area.service';

@Controller()
export class EightAreaController {
  constructor(private readonly eightAreaService: EightAreaService) {}
}
