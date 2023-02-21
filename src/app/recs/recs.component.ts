import { Component, OnInit } from '@angular/core';
import { Rec } from '../rec';
import { RECS } from '../mock-recs';

@Component({
  selector: 'app-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.scss'],
})
export class RecsComponent implements OnInit {

  recs = RECS

  constructor() { }

  ngOnInit() {}

}
