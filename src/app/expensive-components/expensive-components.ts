import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ImageService } from '../image.service';
import { CommonModule } from '@angular/common';
import { Product, TreeNode } from '../models/product.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expensive-components.html',
  styleUrl: './expensive-components.css',
})
export class ExpensiveComponents {

  private photoService = inject(ImageService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  // ======================
  // Gallery
  // ======================
  // images = signal<any[]>([]);
  // activeIndex = signal(0);

  // ======================
  // Tree (flattened version)
  // ======================
  files: TreeNode[] = [];
  flattenedFiles: (TreeNode & { level: number })[] = [];

  // ======================
  // Grid table
  // ======================
  products: Product[] = [];

  // ======================
  // INIT
  // ======================
  async ngOnInit() {

    // Gallery
    // this.photoService.getImages().then((images: any[]) => {
    //   this.images.set(images);
    // });

    // Tree
    this.files = await this.photoService.getFilesystem();
    this.buildTree();

    this.cdr.detectChanges();

    // Grid table
    this.products = await this.photoService.getProductsMini();
    this.cdr.detectChanges();


  }

  // ======================
  // TREE LOGIC (Flatten)
  // ======================
  buildTree() {
    this.flattenedFiles = [];
    this.flattenNodes(this.files, 0);
  }

  private flattenNodes(
    nodes: TreeNode[],
    level: number,
    // parentExpanded: boolean
  ) {
    for (let node of nodes) {

      // Only show if parent is expanded
      // if (!parentExpanded) return;

      (node as any).level = level;

      this.flattenedFiles.push(node as any);

      if (node.children?.length && node.expanded) {
        this.flattenNodes(node.children, level + 1);
      }
    }
  }

  toggle(node: TreeNode) {
    node.expanded = !node.expanded;
    this.buildTree(); // rebuild visible list

  }

  // ======================
  // GALLERY LOGIC
  // ======================
  // selectImage(index: number) {
  //   this.activeIndex.set(index);
  // }

  // next() {
  //   const nextIndex =
  //     (this.activeIndex() + 1) % this.images().length;

  //   this.activeIndex.set(nextIndex);
  // }

  // prev() {
  //   const prevIndex =
  //     (this.activeIndex() - 1 + this.images().length)
  //     % this.images().length;

  //   this.activeIndex.set(prevIndex);
  // }

  getImageDetails(node: any) {
    console.log(node);
  }

  viewDetails() {
    console.log("router");
    this.router.navigate(['/under-develop']);
  }


}


