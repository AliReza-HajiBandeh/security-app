import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';

import {
  Disc, Circle, Github, Linkedin, ChevronLeft, ChevronsLeft, Bell, Settings, Mail, MessageSquare, Search, MoreVertical, Send, User,
  Home, Star, Calendar, Moon, File, Grid, Edit, Layers, Aperture, Menu, Facebook, Lock, TrendingDown, TrendingUp, Coffee, Cpu,
  Monitor, ShoppingBag, ShoppingCart, Heart, RefreshCw, PlusSquare, List, Minus, SkipBack, Save, Delete, Users, LogOut, Plus, MinusSquare,
  Trash, Instagram, Twitter, Paperclip, Radio, Download, RefreshCcw, HelpCircle, Map, PhoneCall ,Upload, ArrowLeft, FileText, Folder, Crosshair,
  X , CheckCircle , UserCheck, LogIn, UserPlus, Smartphone , Check, CheckSquare, Activity, CornerUpLeft , PlayCircle , ArrowLeftCircle,
  Key,Server, Loader, MoreHorizontal, HardDrive, Database
} from 'angular-feather/icons';

const icons = {
  Disc, Circle, Github, Linkedin, ChevronLeft, ChevronsLeft, Bell, Settings, Mail, MessageSquare, Search, MoreVertical, Send, User,
  Home, Star, Calendar, Moon, File, Grid, Edit, Layers, Aperture, Menu, Facebook, Lock, TrendingDown, TrendingUp, Coffee, Cpu,
  Monitor, ShoppingBag, ShoppingCart, Heart, RefreshCw, PlusSquare, List, Minus, Users, SkipBack, Save, Delete, LogOut, Plus, MinusSquare,
  Trash, Instagram, Twitter, Paperclip, Radio, Download, RefreshCcw, HelpCircle, Map, PhoneCall , Upload , ArrowLeft, FileText, Folder, Crosshair,
  X , CheckCircle , UserCheck, LogIn, UserPlus, Smartphone , Check, CheckSquare, Activity, CornerUpLeft, PlayCircle , ArrowLeftCircle, Loader,
  Key, Server, MoreHorizontal, HardDrive, Database
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class FeatherIconsModule { }
