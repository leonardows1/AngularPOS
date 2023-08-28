import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface DirectoryNode{
  directoryNodeId: string,
  name: string,
  openedIcon: string,
  closedIcon: string,
  directoryNodes?: DirectoryNode[]
}

const sidenavData: DirectoryNode[] = [
  {
    directoryNodeId: '',
    name: 'Dashboard',
    closedIcon: '',
    openedIcon: ''
  },
  {
    directoryNodeId: '',
    name: 'Tienda',
    closedIcon: '',
    openedIcon: '',
    directoryNodes: [
      {
        directoryNodeId: '',
        name: 'Caja',
        closedIcon: '',
        openedIcon: ''
      },
      {
        directoryNodeId: '',
        name: 'Ventas',
        closedIcon: '',
        openedIcon: ''
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  events: string[] = [];
  opened: boolean = false;
  shouldRun = true;
  showSidenav: boolean = false;
  private _transformer = (node: DirectoryNode, level: number) => {
    return {
      expandable: !!node.directoryNodes && node.directoryNodes.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.directoryNodes
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = sidenavData;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
  toggleSidenav(){
    this.showSidenav = !this.showSidenav;
  }
}
